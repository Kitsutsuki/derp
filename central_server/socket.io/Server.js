var util = require('../modules').util
, events = require('../modules').events
, mongoose = require('../modules').mongoose
, dbu = require('../database/userManager')
, db = require('../database/DBManager')
, JOBS = require('./Jobs')
, WORKERS = require('./Workers')
, GROUPS = require('./Groups')
, USERS = require('./Users');

function SERVER(client) {
  var ev = this.ev = new events.EventEmitter();
  ev.setMaxListeners(0);
  
  if (this.ev == null) {
    console.log('ERROR');
    process.exit(-1);
  }
  
  this.jobs = new JOBS(ev, client);
  this.jobs = new WORKERS(ev, client);
  this.jobs = new GROUPS(ev, client);
  this.jobs = new USERS(ev, client);
  
  this.ev.on('message', function(data) {
      if(data.cmd == 'connection') {
        dbu.start(dbu.getList(function(err, users) {
            if(err) {throw err;}
            var done = false;
            for(var i in users) {
              if(data.login == users[i].login && data.pass == users[i].pass) {
                data.status = users[i].status;
                done = true;
                break;
              }
              else {
                done = false;
              }
            }            
            if(done) {
              console.log(data);
              client.emit('connected', data.login, data.status);
            }
            else {
              client.send('not connected');
            }
            mongoose.connection.close();
        }));
      }
      else if(data == 'get all') {
        db.start(db.getAll(function (err, names) {
            console.log(names);
            mongoose.connection.close();
        }));
      }
      else {
        console.log('Receiving data:');
        console.log(data);
        switch(data.owner){
        case 'admin' :
          client.send('ADMIN');
          break;
        }
        ev.emit(data.ev, data);
      }
  });
  
};

module.exports = SERVER;
