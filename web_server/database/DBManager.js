var mongoose = require('../modules').mongoose;

var userModel = mongoose.model('usermodel', new mongoose.Schema({
    _id: Number,
    login: String,
    pass: String,
    status: String,
    jobs: String
}), 'usermodels');

function start(callback) {
  mongoose.connect('mongodb://localhost/derp', function(err) {
      if(err) { throw err; }
      else { console.log('Connected to database'); }
  });  
  callback;
}

function getAll(req, res) {
  userModel.find(function(err, data) {
      if(err) { throw err; }
      else {
        console.log('Getting list from db...');
        res.render('user/list', { 
            title: 'Utilisateur',
            table: data
        });
        console.log('OK');
      }
      mongoose.connection.close(function() {
          console.log('Connection closed');
      });
  });
}

exports.start = start;
exports.getAll = getAll;
