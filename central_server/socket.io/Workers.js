var db = require('../database/workerManager')
, util = require('../modules').util
, events = require('../modules').events
, WORKER = require('./Worker');

//============== MAIN

function WORKERS(ev, client) {
  
  var workers = this.workers = [];
  
  if (ev != null) {
    
    ev.on('/workers/', function(data) {
        switch (data.cmd) {
        case 'GET':
          db.start(db.getList(function(err, data) {
              if (err) {
                throw err;
              }              
              client.emit('workers', data);
              db.mongoose.connection.close();
          }));
          client.send('GET : workers list');
          break;
          
        case 'PUT':
          db.start(db.update(data.data, client));
          workers.push(new WORKER(workers.length + 1, data.name, ev));
          break;
          
        case 'HEAD':
          client.send('HEAD : ' + util.inspect(WORKER, {
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

module.exports = WORKERS;
