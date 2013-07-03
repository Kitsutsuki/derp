var db = require('../database/groupManager')
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
        res.render('group/list', { 
            title: 'Groupe',
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
        res.render('group/details', { 
            title: 'Groupe',
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
	res.render('group/add', {
	    title: 'Nouveau',
      table: {name: "", numberWin: 0, numberLin: 0, numberMac: 0, st_hour: 18, st_min: 0, end_hour: 8, end_min: 0, status: true}
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
				res.render('group/modify', { 
				    title: 'Groupe',
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
      var group = {
        type: 'group',
        cmd: 'POST',
        _id: parseInt(item.id) + 1,
        name: req.body.name,
        numberWin: req.body.numberWin,
        numberLin: req.body.numberLin,
        numberMac: req.body.numberMac,
        st_year: 0,
        st_month: 0,
        st_day: 0,
        st_hour: req.body.st_hour,
        st_min: req.body.st_min,
        end_year: 0,
        end_month: 0,
        end_day: 0,
        end_hour: req.body.end_hour,
        end_min: req.body.end_min
      }
      db.mongoose.connection.close(function() {
          console.log('Connection closed');
      });
      write.write(group);
  }));
  res.render('redirect', {
      title: 'Modifications',
      type: 'groupe'
  });
}

exports.modifyRedirection = function(req, res) {
  var group = {
    type: 'group',
    cmd: 'PUT',
    _id: req.params.id,
    name: req.body.name,
    numberWin: req.body.numberWin,
    numberLin: req.body.numberLin,
    numberMac: req.body.numberMac,
    st_year: 0,
    st_month: 0,
    st_day: 0,
    st_hour: req.body.st_hour,
    st_min: req.body.st_min,
    end_year: 0,
    end_month: 0,
    end_day: 0,
    end_hour: req.body.end_hour,
    end_min: req.body.end_min
  }
  db.update(group); 
  res.render('redirect', {
      title: 'Modifications',
      type: 'groupe'
  });
}

exports.deleteRedirection = function(req, res) {
  var group = {
    type: 'group',
    cmd: 'DELETE',
    _id: req.params.id
  }
  db.remove(group);
  res.render('redirect', {
      title: 'Modifications',
      type: 'groupe'
  });
}