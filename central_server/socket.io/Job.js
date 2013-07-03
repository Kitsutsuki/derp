var util = require('../modules').util
, events = require('../modules').events;


//============== MAIN

function JOB(id, name, ev){
  util.debug('Creation ' + name);
  var me = this;
  
  this.id = id;
  this.name = name;
  
  if(ev != null){
    ev.on('/jobs/'+ name, listener);
  }
  
  function listener(data){
    switch(data.cmd){
    case 'GET': 
      data.ori.emit('message', 'GET : ' + JSON.stringify(me));
      break;
      
    case 'HEAD':  
      data.ori.emit('message', 'HEAD : ' + util.inspect(me, { showHidden: true, depth: 4 })); 
      break;
      
    case 'PUT':  
      ev.removeListener('/jobs/'+ me.name, listener);
      me.name = data.name; // pas bien !
      ev.addListener('/jobs/'+ me.name, listener);
      break;
    };
  }
};


module.exports = JOB;
