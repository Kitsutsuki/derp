var db = require('../database/userManager')
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
        res.render('user/list', { 
            title: 'Utilisateur',
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
      else {
        console.log('Getting details from db...');
        res.render('user/details', { 
            title: 'Utilisateur',
            table: data
        });
        console.log('OK');
      }
      db.mongoose.connection.close(function() {
          console.log('Connection closed');
      });
  }));
};

/*
* GET new pages.
*/

exports.add = function(req, res) {
	res.render('user/add', {
	    title: 'Nouveau',
      table: {login: '', pass: ''}
	});
};

/*
* GET modify pages.
*/

exports.modify = function(req, res) {
  db.start(db.getUpdateForm({'_id': req.params.id}, function(err, data) {
      if(err) { throw err; }
      else {
        console.log('Getting update form from db...');
				res.render('user/modify', { 
				    title: 'Utilisateur',
				    table: data
				});
        console.log('OK');
      }
      db.mongoose.connection.close(function() {
          console.log('Connection closed');
      });
  }));
};

/*
* POST redirection pages.
*/

exports.addRedirection = function(req, res) {
  db.start(db.add(function(err, item) {
      var user = {
        type: 'user',
        cmd: 'POST',
        _id: parseInt(item.id) + 1,
        login: req.body.name,
        pass: req.body.pass,
        status: req.body.status,
      }
      db.mongoose.connection.close(function() {
          console.log('Connection closed');
      });
      write.write(user);
  }));
  res.render('redirect', {
      title: 'Modifications',
      type: 'utilisateur'
  });
}

exports.modifyRedirection = function(req, res) {
  var user = {
    type: 'user',
    cmd: 'PUT',
    _id: req.params.id,
    login: req.body.name,
    pass: req.body.pass,
    status: req.body.status,
  }
  db.update(user); 
  res.render('redirect', {
      title: 'Modifications',
      type: 'utilisateur'
  });
}

exports.deleteRedirection = function(req, res) {
  var user = {
    type: 'user',
    cmd: 'DELETE',
    _id: req.params.id
  }
  db.remove(user);
  res.render('redirect', {
      title: 'Modifications',
      type: 'utilisateur'
  });
}