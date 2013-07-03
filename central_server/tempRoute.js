var userDb = require('./database/userManager')
, jobDb = require('./database/jobManager')
, workerDb = require('./database/workerManager')
, groupDb = require('./database/groupManager');

function handle(data) {
  if(data.type == 'user') {
    delete data.type;
    userHandle(data);
  } else if(data.type == 'job') {
    delete data.type;
    jobHandle(data);
  } else if(data.type == 'group') {
    delete data.type;
    groupHandle(data);
  } else if(data.type == 'worker') {
    delete data.type;
    workerHandle(data);
  }
}

function userHandle(data) {
  if(data.cmd == 'POST') {
    delete data.cmd;
    userDb.start(userDb.add(data));
  } else if(data.cmd == 'PUT') {
    delete data.cmd;
    userDb.start(userDb.update(data));
  } else if(data.cmd == 'DELETE') {
    delete data.cmd;
    userDb.start(userDb.remove(data));
  }
}
function jobHandle(data) {
  if(data.cmd == 'POST') {
    delete data.cmd;
    jobDb.start(jobDb.add(data));
  } else if(data.cmd == 'PUT') {
    delete data.cmd;
    jobDb.start(jobDb.update(data));
  } else if(data.cmd == 'DELETE') {
    delete data.cmd;
    jobDb.start(jobDb.remove(data));
  }  
}
function groupHandle(data) {
  if(data.cmd == 'POST') {
    delete data.cmd;
    groupDb.start(groupDb.add(data));
  } else if(data.cmd == 'PUT') {
    delete data.cmd;
    groupDb.start(groupDb.update(data));
  } else if(data.cmd == 'DELETE') {
    delete data.cmd;
    groupDb.start(groupDb.remove(data));
  }  
}
function workerHandle(data) {
  workerDb.start(workerDb.update(data));
}

exports.handle = handle;
