var db = require('../database/userManager')
, util = require('../modules').util
, events = require('../modules').events
, USER = require('./User');

//============== MAIN

function USERS(ev, client) {
  
  var users = this.users = [];
  
  if (ev != null) {
    
    ev.on('/users/', function(data) {
        switch (data.cmd) {
        case 'GET':
          db.start(db.getList(function(err, data) {
              if (err) {
                throw err;
              }              
              client.emit('users', data);
              db.mongoose.connection.close();
          }));
          client.send('GET : users list');
          break;
          
        case 'POST':
          db.start(db.add(data.data, client));
          console.log(data.data.jobs);
          users.push(new USER(users.length + 1, data.data.login, ev));
          break;
          
        case 'PUT':
          db.start(db.update(data.data, client));
          users.push(new USER(users.length + 1, data.name, ev));
          break;
          
        case 'DELETE':
          console.log(data);
          db.start(db.remove(data, client));
          client.send('DELETE : user n°' + data.id);
          break;
          
        case 'HEAD':
          client.send('HEAD : ' + util.inspect(USER, {
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

module.exports = USERS;
