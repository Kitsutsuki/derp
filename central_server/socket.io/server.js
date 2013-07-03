/**
* Start the server
* @param route Function
* @param handle Object
*/

function start(route, handle) {
  
  var SERVER = require('./Server')
  , events = require('../modules').events
  , util = require('../modules').util
  , mongoose = require('../modules').mongoose
  , db = require('../database/userManager');
  
  db.start(db.init());
  
  io = require('../modules').io.listen(config.socket_port, config.socket_host, function() {
      console.log('Server (API 2) listening on ' + config.socket_host + ':' + config.socket_port);
  });
  
  
  io.set('log level', 1);
  io.sockets.on('connection', function(socket) {
      
      console.log('Client connected');
      
      var s = new SERVER(socket);
      
      socket.on('message', function(data) {
          s.ev.emit('message', data);
      });
      socket.on('closed', function(data) {
          mongoose.connection.close(function() {
              console.log('Connection closed');
          });
      });
  });
}

exports.start = start;