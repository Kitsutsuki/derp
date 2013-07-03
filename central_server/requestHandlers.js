var Group = require('./models/Group')
, Job = require('./models/Job')
, Workload = require('./models/Workload')
, Worker = require('./models/Worker')
, Header = require('./models/Header')
, QH = require('./models/QueuesHandler');

var qh = new QH();

qh.on('workload_ready', function(workload) {
    console.log('workload_ready !');
    this.workloadsInfo();
    qh.sendWorkload(workload);
});

qh.on('worker_available', function(worker) {
    console.log('worker_available !');
    this.workloadsInfo();
    if(qh.areWorkloadsWaiting()) qh.findWorkloadForWorker(worker);
});

qh.on('job_finished', function(job) {
    console.log('job_finished');
    //this.processJobResults(job);
});

//When we receive a new job request from the browser
function newJob(client, data) {
    console.log('data new job :'+data);
    var job = new Job(JSON.parse(data));
    qh.addJob(job);
}

//Request from worker -- UNUSED
function work_available(client, data) {
    if(client.type === 'worker') {
        console.log('worker '+client.worker+' asked if work is available');
    }
}

//Response from worker
function workload_received(client, data) {
    if(client.type === 'worker') {
        var workload = qh.findWorkloadByWorker(client.worker);
		console.log('workload_received ');
		console.log(workload._id);
        workload.status = 'sent';
    }
}

//Request from the browser
function job_status(client, data) {
}

//Request from the browser
function workload_status(client, data) {
}

//Response from the worker
function workload_status_is(client, data) {
    if(client.type === 'worker') {
        console.log('workload status is ',data);
    }
}

//Response from the worker, should be a zip
function workload_status_complete(client, data) {
    if(client.type === 'worker') {
        console.log('workload status complete ');
		qh.workerFinishedWork(client.worker,data);
    }
}

//Response from the worker
function workload_status_fail(client, data) {
    if(client.type === 'worker') {
        console.log('workload status fail ',data);
    }
}

//Received echo_request
function echo_request(client, data) {
    if(data === null) {
        console.log('Received blank echo_request');
        var header = new Header('\0RES',17,0);
        var finalB = header.createHeader();
        client.write(finalB, 'binary', function() {console.log('Finished blank echo_response:'+finalB.toString());});
    } else {
        console.log('Received echo_request'+data.toString());
        var header = new Header('\0RES',17);
        var finalB = header.appendHeader(data);
        client.write(finalB,'binary',function() {console.log('Finished echo_response :'+finalB.toString());});
    }
}

//Received echo response
function echo_response(client, data) {
    console.log('Received echo_response '+data.toString());
}

//Received error
function error(client, data) {
    if(data === null) {
        console.log('Error received from '+client.name);
    } else {
        console.log('Error received from '+client.name+' : '+data.toString());
    }
}

//Received worker specs req : from browser
function worker_specs_req(client, data) {
    if(client.type === 'browser') {
        console.log('browser require specs');
    }
}

//Received worker specs res : from worker
function worker_specs_res(client, data) {
    if(client.type === 'worker') {
        if(data === null) {
            console.log('Error reading specs data');
        }
        else {
            console.log(data.toString());
            client.worker.updateSpecs(data, function(err) {
                if(err) {
                    console.log(err);
                    if(typeof err === 'string') global.errorLog.error(err);
                    else if(typeof err === 'object') global.errorLog.error(err.message);
                }
                else {
                    qh.newWorker(client.worker);
                }
            });
            
        }
    }
}

function set_worker_opts(client, data) {
}

function get_worker_opts(client, data) {
}

function set_group(client, data) {
}

function get_group(client, data) {
}

//Authentification request from Worker
function worker_conec_req(client, data) {
    if(client.type === 'worker') {
        console.log('Key :'+data);
        if(typeof data === 'undefined' || data === null || data.toString() !== 'logon') {
            console.log('Wrong authentification');
            client.end();
        } else {
            console.log('Received correct authentification');
            var buf = new Buffer(1);
            buf.writeInt8(0,0);
            var header = new Header('\0RES',30);
            var finalB = header.appendHeader(buf);
            console.log(finalB);
            console.log(finalB.toString());
            client.write(finalB,'binary',function() {
                client.worker.specsRequest();
            });
            client.isAuthenticated = true;
            client.worker = new Worker();
            client.worker.socket = client;
            
        }
    } else {
        client.end();
    }
}

module.exports.newJob = newJob;
module.exports.work_available = work_available;
module.exports.workload_received = workload_received;
module.exports.job_status = job_status;
module.exports.workload_status = workload_status;
module.exports.workload_status_is = workload_status_is;
module.exports.workload_status_complete = workload_status_complete;
module.exports.workload_status_fail = workload_status_fail;
module.exports.echo_request = echo_request;
module.exports.echo_response = echo_response;
module.exports.error = error;
module.exports.worker_specs_req = worker_specs_req;
module.exports.worker_specs_res = worker_specs_res;
module.exports.set_worker_opts = set_worker_opts;
module.exports.get_worker_opts = get_worker_opts;
module.exports.set_group = set_group;
module.exports.get_group = get_group;
module.exports.worker_conec_req = worker_conec_req;