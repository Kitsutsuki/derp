var db = require('../database/jobManager')
, util = require('../modules').util
, events = require('../modules').events
, JOB = require('./Job');

//============== MAIN

function JOBS(ev, client) {
  
  var jobs = this.jobs = [];
  
  if (ev != null) {
    
    ev.on('/jobs/', function(data) {
        switch (data.cmd) {
        case 'GET':
          db.start(db.getList(function(err, data) {
              if (err) {
                throw err;
              }
              client.emit('jobs', data);
              db.mongoose.connection.close();
          }));
          client.send('GET : jobs list');
          break;
          
        case 'POST':
          db.start(db.add(data.data, client));
          jobs.push(new JOB(jobs.length + 1, data.name, ev));
          break;
          
        case 'PUT':
          db.start(db.update(data.data, client));
          jobs.push(new JOB(jobs.length + 1, data.name, ev));
          break;
          
        case 'DELETE':
          console.log(data);
          db.start(db.remove(data, client));
          client.send('DELETE : job n°' + data.id);
          break;
          
        case 'HEAD':
          client.send('HEAD : ' + util.inspect(JOB, {
              showHidden: true,
              depth: 50
          }));
          break;
          
        default: 
          client.send('Wrong command');
          
        };
    });
  }
};

module.exports = JOBS;