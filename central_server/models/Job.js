/**
This should have all the parts concerning the handling of the jobs
**/
var _ = require('../modules').underscore
, fs = require('fs');

/**
* Job object constructor, is constructed by parsing json
* @param object Object
*
* @return Job object
*/
function Job(object) {
    this.path = null;
    this.winPath = null;
    this.linuxPath = null;
    this.macPath = null;
    this.owner = 'owner';
    this.name = 'job_name'+Math.floor((Math.random()*100)+1);
    this.minRam = 0;
    this.maxRam = 162529280;// in bits
    this.minCpuFrequence = 0;
    this.filesCreated = false;
    this.filesNamePatterns = null;
    this.isUsingCG = false;
    this.nbRun = 1;
    this.archi = 32;
    this.parametersList = null;
    this.priority = null;
    this.status = 'pending';
    this.progress = 0;
    this.dir = null;
    this.resultFile = null;
    
    // Kind of copy constructor
    if(typeof object === 'object') _.extend(this, object);
    this.parametersList = JSON.parse(this.parametersList);
    
    this._id = this.owner+'_'+this.name;
};

Job.prototype.toString = function() {
    return this.name+', runs:'+this.nbRun;
}

/**
* Ask the dbManager to save the job, omitting some members
* @param dbManager
*/
Job.prototype.save = function(dbManager) {
    var json = JSON.stringify(this.parametersList);
    var temp = _.chain(_.clone(this)).extend({'parametersList':json}).value();
    dbManager.saveJob(temp);
}

/**
* Asks the dbManager to delete the job
* @param dbManager DBManager object
*/
Job.prototype.delete = function(dbManager) {
    dbManager.deleteJob(this);
}

/**
* Private function, tries to create a path, edit the job object and callback
* if error, callback(err)
* @param path String
* @param job Job object
* @param callback
*/
var _createJobDir = function(path, job, callback) {
    fs.exists(path, function(exists) {
        if(!exists) {
            fs.mkdir(path, '0777', function(err) {
                if(err) {
                    callback(err);
                } else {
                    job.dir = path;
                    callback(null);
                }
            });
        } else {
            console.log('/jobs/job folder already exists, rename your job');
            errorLog.error('Rename your job, can\'t create job folder');
            callback('Rename your job, can\'t create job folder');
        }
    });
}

/**
* Tries to create the job directory, and verify the /jobs folder existence & create if not there
* if error, callback(err)
* @param callback
*/
Job.prototype.createDir = function(callback) {
    var jobs_path = config.base_node_dir+'/jobs';
    var job_path = jobs_path+'/job_'+this.owner+'_'+this.name;
    var self = this;
    
    fs.exists(jobs_path, function(exists) {
        if(!exists) {
            console.log('/node/jobs dir does NOT exist, creating ...');
            fs.mkdir(jobs_path,
            '0777',
            function(err) {
                if(err) {
                    callback(err);
                } else {
                    _createJobDir(job_path, self, callback);
                }
            }
            );
        }
        else {
            console.log('/node/jobs dir DOES exist, continuing ...');
            _createJobDir(job_path, self, callback);
        }
    });
}

/**
* Finalize the job
*/
Job.prototype.finalizeResult = function(callback) {
    //@TODO Agglomerate all results, set state, set zip link, all that stuff
}

module.exports = Job;
