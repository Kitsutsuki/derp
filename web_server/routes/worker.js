var db = require('../database/workerManager')
, dbg = require('../database/groupManager')
, net = require('net')
, Header = require('../Header')
, write = require('../database/write');

/*                                                                                                          
* GET list pages.
*/

exports.list = function(req, res){
  db.start(db.getAll(function(err, data) {
      if(err) { throw err; }
      else {
        console.log('Getting list from db...');
        res.render('worker/list', { 
            title: 'Worker',
            table: data
        });
        console.log('OK');
      }
      db.mongoose.connection.close(function() {
          console.log('Connection closed');
      });
  }));
}

/*
* GET details pages.
*/

exports.details = function(req, res) {
  db.start(db.getOne({'_id': req.params.id}, function(err, data) {
      if(err) { throw err; }
      console.log('Getting details from db...');
      res.render('worker/details', { 
          title: 'Worker',
          table: data
      });
      console.log(data);
      console.log('OK');
      db.mongoose.connection.close(function() {
          console.log('Connection closed');
      });
  }));
};

/*
* GET modify pages.
*/

exports.modify = function(req, res) {
  db.start(db.getUpdateForm({'_id': req.params.id}, function(err, data) {
      console.log(data);
      dbg.getAll(function(err, groups) {
          console.log(groups);
          if(err) { throw err; }
          else {
            console.log('Getting update form from db...');
            res.render('worker/modify', { 
                title: 'Worker',
                table: data,
                groups: groups
            });
            console.log('OK');
          }
          db.mongoose.connection.close(function() {
              console.log('Connection closed');
          });
      });
  }));
}

/*
* POST redirection pages.
*/

exports.modifyRedirection = function(req, res) {
  var worker = {
    type: 'worker',
    cmd: 'PUT',
    _id: req.params.id,
    groupName: req.body.groupName,
  }
  db.update(worker); 
  res.render('redirect', {
      title: 'Modifications',
      type: 'worker'
  });
}
