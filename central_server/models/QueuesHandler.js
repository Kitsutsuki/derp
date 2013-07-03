var util = require('../modules').util
, _ = require('../modules').underscore
, each = require('../modules').each
, EE = require('../modules').events.EventEmitter
, DBManager = require('./DBManager')
, Group = require('./Group')
, Job = require('./Job')
, Workload = require('./Workload')
, Worker = require('./Worker')
, Header = require('./Header')
, dbManager = new DBManager();

/**
* QueuesHandler object, inherits from EventEmitter
*/
function QueuesHandler() {
    this.job_Q = new Array();
    this.available_worker_Q = new Array();
    this.busy_worker_Q = new Array();
    this.waiting_workload_Q = new Array();
    this.sent_workload_Q = new Array();
    this.groups = new Array();
}
util.inherits(QueuesHandler,EE);

/**
* Add a job to the job_Q array, divide it in workloads, add them to the waiting_workload_Q and
* emit a signal to try to send them
* @param job Job object
*/
QueuesHandler.prototype.addJob = function(job) {
    var self = this;
    this.job_Q.push(job);
    job.save(dbManager);
    job.createDir(function(err) {
        //If there was an error
        if(err) {
            reportError(err);
            job.delete(dbManager);
            self.job_Q.singleRemove(job);
        } else {
            //For each execs, prepare them
            each(job.parametersList)
            .on('item', function(element, index, next) {
                var workload = new Workload({_id:job._id+'_'+index, job:job, jobId:job._id, nb:index, paramString:element});
                self.waiting_workload_Q.push(workload);
                workload.createDir(job, function(err) {
                    if(err) {
                        reportError(err);
                        self.waiting_workload_Q.singleRemove(workload);
                    } else {
                        workload.prepare(job, function(err) {
                            if(err) {
                                reportError(err);
                                job.delete(dbManager);
                                self.job_Q.singleRemove(job);
                            } else {
                                self.emit('workload_ready',workload);
                            }
                        });
                    }
                });
                setTimeout(next, 500);
            })
            .on('error', function(err) {
                console.log('error each '+err);
            })
            .on('end', function() {
                if(job.status === 'pending') job.status = 'queuing';
            });
        }
    });
}

/**
* Try to send a workload to a worker
* @param workload Workload object
*/
QueuesHandler.prototype.sendWorkload = function(workload) {
    var self = this;
    try {    
        //Workers available and config ok
        if(self.available_worker_Q.length > 0) {
            var job = self.findJobByWorkload(workload);
            var goodWorkers = _.filter(self.available_worker_Q,
            function(worker) {
                return self.workerOkForThatJob(worker, job);;
            },
            {job:job});
            if(goodWorkers.length !== 0) {
                workload.sendToWorker(goodWorkers[0]);
                
                self.busy_worker_Q.push(goodWorkers[0]);
                self.available_worker_Q.singleRemove(goodWorkers[0]);
                self.sent_workload_Q.push(workload);
                self.waiting_workload_Q.singleRemove(workload);
                
                self.workloadsInfo();
            }
            else {
                console.log('No good workers available, workload waiting');
                workload.status = 'queuing';
            }
        }
        else {
            console.log('No Workers available, workload waiting');
            workload.status = 'queuing';
        }
    }
    catch (err) {
        reportError(err);
    }
}

/**
* Try to find a workload to send to a newly connected/available worker
* @param worker Worker object
*/
QueuesHandler.prototype.findWorkloadForWorker = function(worker) {
    var self = this;
    each(self.waiting_workload_Q)
    .on('item', function(workload, index, next) {
        var job = self.findJobByWorkload(workload);
        if(self.workerOkForThatJob(worker, job)) {
            workload.sendToWorker(worker);
            
            self.busy_worker_Q.push(worker);
            self.available_worker_Q.singleRemove(worker);
            self.sent_workload_Q.push(workload);
            self.waiting_workload_Q.singleRemove(workload);
            
            self.workloadsInfo();
        }
        else {
            setTimeout(next,1000);
        }
    })
    .on('error', function(err) {
        reportError(err);
    })
    .on('end', function(count) {
        console.log('Worker specs don\'t meet workloads specs, worker still waiting');
    })
}

/**
* Add a worker newly connected
* @param worker Worker object
*/
QueuesHandler.prototype.newWorker = function(worker) {
    this.available_worker_Q.push(worker);
    worker.save(dbManager);
    this.emit('worker_available', worker);
}

/**
* Remove a worker, and place the corresponding workload if one is in progress back
* in the waiting_workload_Q
* @param worker Worker object
*/
QueuesHandler.prototype.removeWorker = function(worker) {
    console.log('Worker state : ',worker.state);
    switch (worker.state) {
        case Worker.STATE_ERROR:
            break;
        case Worker.STATE_WAITING:
            console.log('Worker was waiting, remove it');
            worker.state = Worker.STATE_OFFLINE;
            this.available_worker_Q.singleRemove(worker);
            worker.save(dbManager);
            worker.socket.worker = null;
            worker.socket = null;
            break;
        case Worker.STATE_WORKING:
           if(client.worker.workload !== null) {
                console.log('Worker was working, remove/clean its workload, then remove it');
                //@TODO update db, process the switch of workloads from
                //sent_workload_Q to waiting_workload_Q
            }
            break;
        default:
            console.log('Default removal');
            break;
    }
    this.workersInfo();
}

/**
* Process a finished job, save it in history, agglomerate all workloads results
* make a link to the zip available, and save it to the db, and remove it (remove all processed
* workloads from the sent_workload_Q)
* @param job Job object
*/
QueuesHandler.prototype.processJobFinished = function(job) {
    job.finalizeResult();
    job.save();
    this.removeJob(job);
    console.log('Job over '+job.toString());
}

/**
* Remove a job
* @param job Job object
*/
QueuesHandler.prototype.removeJob = function(job) {
    var self = this;
    _.each(this.sent_workload_Q, function(element, index, list) {
        if(element.job === job) this.sent_workload_Q.singleRemove(element);
    });
    //@TODO Save in the job history
}

/**
* Check if a worker is specs-ready for a job
* @param worker Worker object
* @param job Job object
*/
QueuesHandler.prototype.workerOkForThatJob = function(worker, job) {
    //If worker has a group
    if(worker.groupName !== null) {
        if((job.winPath != null && worker.OS[worker.os] == 'win') ||
                (job.linuxPath != null && worker.OS[worker.os] === 'linux') ||
                (job.macPath != null && worker.OS[worker.os] == 'mac')) {
            var date = new Date();
            var group = this.findGroupByName(worker.groupName);
            if((group.end_hour <= date.getHours() && date.getHours() <= group.st_hour) && 
                    (group.end_min <= date.getMinutes() && date.getMinutes() <= group.st_min)) {
                if(worker.RAM !== null && (job.minRam <= worker.RAM && worker.RAM <= job.maxRam )) {
                    /*
                if(true) {
                    return true;
                }
                else return false;*/
                    return true;
                } else return false;
            } else return false;
        } else return false;
    }
    //No group
    else {
        if((job.winPath != null && worker.OS[worker.os] == 'win') ||
                (job.linuxPath != null && worker.OS[worker.os] === 'linux') ||
                (job.macPath != null && worker.OS[worker.os] == 'mac')) {
            if(worker.RAM !== null && (job.minRam <= worker.RAM && worker.RAM <= job.maxRam )) {
                /*
                if(true) {
                    return true;
                }
                else return false;*/
                return true;
            }
            else return false;
        }
        else return false;
    }
}

/**
* Set a worker state to busy after the workload was received
* @param worker Worker object
*/
QueuesHandler.prototype.workloadReceivedByWorker = function(worker) {
    worker.state = 'busy';
}

/**
* Worker finished work
* @param worker Worker object
* @param data Buffer object
*/
QueuesHandler.prototype.workerFinishedWork = function(worker, data) {
    var self = this;
    var workload = worker.workload;
    workload.saveResult(data, function(err) {
        if(err) {
            workload.status = 'fail';
            reportError(err);
        }
        else {
            console.log('Worker finished workload '+worker.workload._id);
            worker.workload.status = 'finished';
            worker.workload = null;
            self.busy_worker_Q.remove(worker);
            self.available_worker_Q.push(worker);
            self.emit('worker_available', worker);
        }
        workload.job.progress++;
        workload.job.save(dbManager);
        
        if(workload.job.progress == workload.job.nbRun) self.emit('job_finished', workload.job);
    });
}

/**
* Find the job corresponding to the workload
* @param workload Workload object
*
* @return Job object
*/
QueuesHandler.prototype.findJobByWorkload = function(workload) {
    return workload.job;
}

/**
* Find the group corresponding to its id
* @param String The id of the group
*
* @return Group object
*/
QueuesHandler.prototype.findGroupByName = function(name) {
    return _.where(this.groups, {name:name})[0];
}

/**
* Find the workload assigned to the worker
* @param worker Worker object
*
* @return Workload object
*/
QueuesHandler.prototype.findWorkloadByWorker = function(worker) {
    return worker.workload;
}

/**
* Check to see if workloads are waiting
* @return Boolean
*/
QueuesHandler.prototype.areWorkloadsWaiting = function() {
    if(this.waiting_workload_Q.length > 0) return true;
    else false;
}

QueuesHandler.prototype.workloadsInfo = function() {
    console.log('Nombre de workloads en attente :');
    console.log(this.waiting_workload_Q.length);
    console.log('Nombre de workloads envoyes :');
    console.log(this.sent_workload_Q.length);
}

QueuesHandler.prototype.workersInfo = function() {
    console.log('Nombres de workers disponible :');
    console.log(this.available_worker_Q.length);
    console.log('Nombres de workers occupés :');
    console.log(this.busy_worker_Q.length);
}

module.exports = QueuesHandler;
