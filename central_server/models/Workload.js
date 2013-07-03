/**
This should have all the parts concerning the handling of the workloads
**/
var _ = require('../modules').underscore
, fs = require('../modules').fs
, XMLWriter = require('../modules').XMLWriter
, ZipStream = require('../modules').ZipStream
, each = require('../modules').each
, Header = require('./Header');

/**
* Workload object constructor
* @param object
*
* @return Workload object
*/
function Workload(object) {
    this._id = null;
    this.jobId = null;
	this.job = null;
    this.nb = null;
    this.worker = null;
    this.status = 'pending';
    this.progress = 0;
    this.paramString = null;
    this.dir = null;
    
    // Kind of copy constructor
    if(typeof object === 'object') _.extend(this,object);
};


/**
* Private function, tries to create a path, edit the workload object and callback
* if error, callback(err)
* @param path String
* @param workload Workload object
* @param callback
*
* @return Workload object
*/
function _createJobDir(path, workload, callback) {
    fs.exists(path, function(exists) {
        if(!exists) {
            fs.mkdir(path, '0777', function(err) {
                if(err) {
                    callback(err);
                } else {
                    workload.dir = path;
                    callback(null);
                }
            });
        } else {
            callback('Workload already exists, rename job');
        }
    });
}

/**
* Create the job directory, and execute the callback with an error parameter if an error occured
* @param job Job object
* @param callback
*/
Workload.prototype.createDir = function(job, callback) {
    var workloads_path = job.dir+'/workloads';
    var workload_path = workloads_path+'/'+this._id;
    var self = this;
    
    fs.exists(workloads_path, function(exists) {
        if(!exists) {
            console.log('/job/workloads dir does NOT exist, creating ...');
            fs.mkdir(workloads_path,
            '0777',
            function(err) {
                if(err) {
                    callback(err);
                } else {
                    _createJobDir(workload_path, self, callback);
                }
            }
            );
        }
        else {
            console.log('/job/workloads dir DOES exist, continuing ...');
            _createJobDir(workload_path, self, callback);
        }
    });
}

/**
* Private function to prepare the config.xml file for the workload
* @param workload Workload object
* @param job Job object
*/
function prepXml(workload, job) {
    var xw = new XMLWriter;
    var ws = fs.createWriteStream(workload.dir+'/config.xml', {flags:'w'});

    xw.startElement('WorkloadInformation').writeAttribute('xmlns', 'http://www.example.org/WorkloadInformation');
    xw.writeElement('workloadName', workload._id);
    xw.writeElement('path', '/Workload');
    xw.writeElement('execConfigurationParameter', '1');
    xw.writeElement('execType', '2');
    var paramArray = workload.paramString.split(' ');
    paramArray = _.without(paramArray, '');
    xw.startElement('execParameters');
    _.each(paramArray, function(element, index, list) {
        xw.writeElement('parameter', element);
    });
    xw.endElement();
    xw.endDocument();
    
    ws.write(xw.toString());
    ws.end();
}

/**
* Private function to create all possibles workload to zip ... it is wasteful in terms of space I recon.
* @param workload Workload object
* @param job Job object
* @param callback
*/
function prepZip(workload, job, callback) {
    //iterating over the jobs path
    _.each({'win':job.winPath,'linux':job.linuxPath,'mac':job.macPath}, function(element, index, list) {
        //If the job has a path
        if(element !== null) {
            // TO-DO : take an uploaded archive, unzip it, add config.xml, rezip it
            var out = fs.createWriteStream(workload.dir+'/workload_'+index+'.zip');
            var zip = ZipStream.createZip({ level: 1 });

            zip.pipe(out);
            
            var debugPath = job.path+'/'+index+'/'+element;
            
            //This crap is necessary because the zipstream is pretty brutal, so I manually check
            //file existence before using the lib
            fs.exists(debugPath, function(exists) {
                if(exists === true) {
                    debugPath = workload.dir+'/config.xml';
                    fs.exists(debugPath, function(configExists) {
                        if(configExists === true) {
                            //Adding app
                            zip.addFile(fs.createReadStream(job.path+'/'+index+'/'+element), { name: element }, function() {
                                //Adding config.xml
                                zip.addFile(fs.createReadStream(workload.dir+'/config.xml'), { name: 'config.xml' }, function() {
                                    zip.finalize(function(written) { 
                                        //console.log(written+' total bytes written');
                                        callback(null);
                                    });
                                });
                            });
                        } else callback('File '+debugPath+' does not exist');
                    });
                } else callback('File '+debugPath+' does not exist');
            });
        }
    });
    
    /*each({'win':job.winPath,'linux':job.linuxPath,'mac':job.macPath})
    .on('item', function(key, value, next) {
		if(value !== null) {
			// TO-DO : take an uploaded archive, unzip it, add config.xml, rezip it
			var out = fs.createWriteStream(workload.dir+'/workload_'+key+'.zip');
			var zip = ZipStream.createZip({ level: 1 });

			zip.pipe(out);
			
			var debugPath = job.path+'/'+key+'/'+value;
			
			//This crap is necessary because the zipstream is pretty brutal, so I manually check
			//file existence before using the lib
			fs.exists(debugPath, function(exists) {
				if(exists === true) {
					debugPath = workload.dir+'/config.xml';
					fs.exists(debugPath, function(configExists) {
						if(configExists === true) {
							//Adding app
							zip.addFile(fs.createReadStream(job.path+'/'+key+'/'+value), { name: value }, function() {
								//Adding config.xml
								zip.addFile(fs.createReadStream(workload.dir+'/config.xml'), { name: 'config.xml' }, function() {
									zip.finalize(function(written) {
										setTimeout(next, 500);
									});
								});
							});
						} else callback('File '+debugPath+' does not exist');
					});
				} else callback('File '+debugPath+' does not exist');
			});
		}
		
	})
	.on('error', function(err) {
		callback(err);
	})
	.on('end', function() {
		console.log('End workloads prepare');
		callback(null)
	});*/
}

/**
* Prepare the workload
* @param job Job object
* @param callback
*/
Workload.prototype.prepare = function(job, callback) {
	console.log('prepare');
    try {
        //Do stuff
        prepXml(this, job);
		console.log('after prepXml');
        prepZip(this, job, function(err) {
			console.log('callback prepZip '+err);
            if(err) {
                callback(err);
            }
            else {
                callback(null);
            }
        });
    }
    catch(err) {
        callback(err);
    }
}

/**
* Send the workload to the worker
* @param worker Worker object
*/
Workload.prototype.sendToWorker = function(worker) {
    var self = this;
    //Upon chosing the worker, we can chose the workload zip type, that is win, linux or mac
    var debug = self.dir+'/workload_'+worker.OS[worker.os]+'.zip';
    console.log(debug);
    fs.readFile(self.dir+'/workload_'+worker.OS[worker.os]+'.zip', function(err, data) {
        if(err) {
            reportError(err);
        }
        else {
            var header = new Header(Header.REQ,Header.SUBMIT_WORKLOAD);
            var finalB = header.appendHeader(data);
            worker.socket.write(finalB, 'binary', function() {
                console.log('Wl '+self._id+' sent to '+worker.hostname);
            });
			
            self.worker = worker;
            worker.workload = self;
            console.log('Wl '+self._id+' at '+debug+' sent to '+worker.hostname+' schedule');
        }
    });
}

/**
* Save the result sent from a worker in the workload dir
* @param data Buffer object
* @param callback
*/
Workload.prototype.saveResult = function(data, callback) {
    fs.writeFile(this.dir+'/result.zip', data, function(err) {
        if(err) callback(err);
        else callback(null);
    });
}

module.exports = Workload;
