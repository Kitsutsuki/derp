var db = require('../database/groupManager')
, util = require('../modules').util
, events = require('../modules').events
, GROUP = require('./Group');

//============== MAIN

function GROUPS(ev, client) {
  
  var groups = this.groups = [];
  
  if (ev != null) {
    
    ev.on('/groups/', function(data) {
        switch (data.cmd) {
        case 'GET':
          db.start(db.getList(function(err, groups) {
              if (err) {
                throw err;
              }
              if(data.display) {
                client.emit('groups', groups);
              }
              else {
                client.emit('groupNames', groups);
              }
              db.mongoose.connection.close();
          }));
          client.send('GET : groups list');
          break;
          
        case 'POST':
          db.start(db.add(data.data, client));
          groups.push(new GROUP(groups.length + 1, data.name, ev));
          break;
          
        case 'PUT':
          db.start(db.update(data.data, client));
          groups.push(new GROUP(groups.length + 1, data.name, ev));
          break;
          
        case 'DELETE':
          console.log(data);
          db.start(db.remove(data, client));
          client.send('DELETE : group n°' + data.id);
          break;
          
        case 'HEAD':
          client.send('HEAD : ' + util.inspect(GROUP, {
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

module.exports = GROUPS;
