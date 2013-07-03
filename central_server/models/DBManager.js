/**
This should have all the parts concerning the handling of the database mongodb (static for now)
**/
var mongoose = require('../modules').mongoose;

function DBManager(db, host, port, dbname) {
  var db = null;
  var connected = false;
  this.init();
};

DBManager.prototype.init = function() {
  self = this;/*
  mongoose.connect(self.connectionString(), function(err, db) {
      if(err) {
        console.log(err);
        console.log('Failed to connect to database');
      }
      else
      {
        self.db = db;
        self.connected = true;
      }
  });*/
}

/**
* Generate the connection string for the database
** @return String
*/
DBManager.prototype.connectionString = function() {
  return this.db+'://'+this.host+':'+this.port+'/'+this.dbname;
};

/**
* Save a group
** @param group Group object
*/
DBManager.prototype.saveGroup = function(group) {
  if(this.connected)
  {
    var collection = this.db.collection('groupmodels');
    collection.findOne({'_id':group._id}, function(err, doc){
        if(doc === null)        {
          collection.insert(group, {w:1}, function(err, result) {});
        }else
        {
          collection.save(group, {w:1}, function(err, result) {});
        }
    });
  }
};

/**
* Save a job
** @param job Job object
*/
DBManager.prototype.saveJob = function(job) {
  if(this.connected)
  {
    var collection = this.db.collection('jobmodels');
    collection.findOne({'_id':job._id}, function(err, doc){
        if(doc === null)
        {
          collection.insert(job, {w:1}, function(err, result) {});
        }else
        {
          collection.save(job, {w:1}, function(err, result) {});
        }
    });
  }
};

/**
* Save an user
** @param user User object
*/
DBManager.prototype.saveJob = function(job) {
  if(this.connected)
  {
    var collection = this.db.collection('usermodels');
    collection.findOne({'_id':user._id}, function(err, doc){
        if(doc === null)
        {
          collection.insert(user, {w:1}, function(err, result) {});
        }else
        {
          collection.save(user, {w:1}, function(err, result) {});
        }
    });
  }
};

/**
* Save a worker
* @param worker Worker object
*/
DBManager.prototype.saveWorker = function(worker) {
  if(this.connected)
  {
    var collection = this.db.collection('workermodels');
    collection.findOne({'hostname':worker.hostname,'ipAddress':worker.ipAddress}, function(err, doc){
        if(err) {
          reportError(err);
        } else {
          if(doc === null)
          {
            collection.insert(worker, {w:1}, function(err, result) {
                if(err) {
                  reportError(err);
                }
            });
          } else {
            collection.update(worker, {w:1}, function(err, result) {
                if(err) {
                  reportError(err);
                }
            });
          }
        }
    });
  }
};

/**
* Delete a group
** @param group Group object
*/
DBManager.prototype.deleteGroup = function(group) {
  if(this.connected)
  {
    var collection = this.db.collection('groupmodels');
    collection.findOne({'_id':group._id}, function(err, doc){
        if(doc === null)
        {
          console.log('You are trying to delete an object which doesn\'t exist in db');
        }else
        {
          console.log('Group succesfully removed from db');
          collection.remove(group, {w:1}, function(err, result) {});
        }
    });
  }
};

/**
* Delete job
** @param job Job object
*/
DBManager.prototype.deleteJob = function(job) {
  if(this.connected)
  {
    var collection = this.db.collection('jobmodels');
    collection.findOne({'_id':job._id}, function(err, doc){
        if(doc === null)
        {
          console.log('You are trying to delete an object which doesn\'t exist in db');
        }else
        {
          console.log('Job succesfully removed from db');
          collection.remove(job, {w:1}, function(err, result) {});
        }
    });
  }
};

/**
* Delete user
** @param user User object
*/
DBManager.prototype.deleteJob = function(job) {
  if(this.connected)
  {
    var collection = this.db.collection('usermodels');
    collection.findOne({'_id':user._id}, function(err, doc){
        if(doc === null)
        {
          console.log('You are trying to delete an object which doesn\'t exist in db');
        }else
        {
          console.log('User succesfully removed from db');
          collection.remove(user, {w:1}, function(err, result) {});
        }
    });
  }
};

/**
* Delete a worker
** @param worker Worker object
*/
DBManager.prototype.deleteWorker = function(worker) {
  if(this.connected)
  {
    var collection = this.db.collection('workermodels');
    collection.findOne({'_id':worker._id}, function(err, doc){
        if(doc === null)
        {
          console.log('You are trying to delete an object which doesn\'t exist in db');
        }else
        {
          console.log('Worker succesfully removed from db');
          collection.remove(worker, {w:1}, function(err, result) {});
        }
    });
  }
};

/**
* Get all groups
** @return Array
*/
DBManager.prototype.getAllGroups = function() {
  if(this.connected)
  {
    var collection = this.db.collection('groupmodels');
    var cursor = collection.find();
    var list = new Array();
    cursor.each(function(err, item){
        list.push(item);
    });
    return list;
  }
};

/**
* Get all jobs
** @return Array
*/
DBManager.prototype.getAllJobs = function() {
  if(this.connected)
  {
    var collection = this.db.collection('jobmodels');
    var cursor = collection.find();
    var list = new Array();
    cursor.each(function(err, item){
        list.push(item);
    });
    return list;
  }
};

/**
* Get all the workers
** @return Array
*/
DBManager.prototype.getAllWorkers = function() {
  if(this.connected)
  {
    var collection = this.db.collection('workermodels');
    var cursor = collection.find();
    var list = new Array();
    cursor.each(function(err, item){
        list.push(item);
    });
    return list;
  }
};

module.exports = DBManager;