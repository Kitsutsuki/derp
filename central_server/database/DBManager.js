var mongoose = require('../modules').mongoose;

function start(callback) {
  mongoose.connect('mongodb://localhost/derp', function(err) {
      if(err) { console.log(err); }
      else { console.log('Connected to database'); }
  });  
  callback;
}

function getAll(callback) {
  console.log(mongoose.connection.modelNames());
}

exports.start = start;
exports.getAll = getAll;
