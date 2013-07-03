var db = require('../database/jobManager')
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
        res.render('job/list', { 
            title: 'Job',
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
        res.render('job/details', { 
            title: 'Job',
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
	res.render('job/add', {
	    title: 'Nouveau',
      table: {path: '', winPath: '', linPath: '', macPath: '', name: '', minRam: 0, maxRam: 0, minCpuFrequence: 0, filesCreated: false, filesNamePatterns: '', isUsingCG: false, nbRun: 0, archi: 32, parametersList: '', priority: 1}
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
				res.render('job/modify', { 
				    title: 'Job',
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
      var job = {
        type: 'job',
        cmd: 'POST',
        _id: parseInt(item.id) + 1,
        path: req.body.path,
        winPath: req.body.winPath,
        linPath: req.body.linPath,
        macPath: req.body.macPath,
        name: req.body.name,
        minRam: req.body.minRam,
        maxRam: req.body.maxRam,
        minCpuFrequence: req.body.minCpuFrequence,
        filesCreated: req.body.filesCreated,
        filesNamePatterns: req.body.filesNamePatterns,
        isUsingCG: req.body.isUsingCG,
        nbRun: req.body.nbRun,
        archi: req.body.archi,
        parametersList: req.body.parametersList,
        priority: req.body.priority,
        status: 'pending',
        progress: 0
      }
      db.mongoose.connection.close(function() {
          console.log('Connection closed');
      });
      write.write(job);
  }));
  res.render('redirect', {
      title: 'Modifications',
      type: 'job'
  });
}

exports.modifyRedirection = function(req, res) {
  var job = {
    type: 'job',
    cmd: 'PUT',
    _id: req.params.id,
    path: req.body.path,
    winPath: req.body.winPath,
    linPath: req.body.linPath,
    macPath: req.body.macPath,
    name: req.body.name,
    minRam: req.body.minRam,
    maxRam: req.body.maxRam,
    minCpuFrequence: req.body.minCouFrequence,
    filesCreated: req.body.filesCreated,
    filesNamePatterns: req.body.filesNamePatterns,
    isUsingCG: req.body.isUsingCG,
    nbRun: req.body.nbRun,
    archi: req.body.archi,
    parametersList: req.body.parametersList,
    priority: req.body.priority
  }
  db.update(job); 
  res.render('redirect', {
      title: 'Modifications',
      type: 'job'
  });
}

exports.deleteRedirection = function(req, res) {
  var job = {
    type: 'job',
    cmd: 'DELETE',
    _id: req.params.id
  }
  db.remove(job);
  res.render('redirect', {
      title: 'Modifications',
      type: 'job'
  });
}