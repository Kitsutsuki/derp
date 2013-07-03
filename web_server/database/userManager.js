var mongoose = require('../modules').mongoose
, write = require('./write');

var userModel = mongoose.model('usermodel', new mongoose.Schema({
    _id: Number,
    login: String,
    pass: String,
    status: String,
    users: String
}), 'usermodels');

function start(callback) {
  mongoose.connect('mongodb://localhost/derp', function(err) {
      if(err) { throw err; }
      else { console.log('Connected to database'); }
  });  
  
  callback;
}

function getAll(callback) {  
  userModel.find(callback);
}

function getOne(query, callback) {
  userModel.findOne(query, callback);
}

function add(callback) {
  userModel.findOne().sort('-_id').exec(callback);
}

function getUpdateForm(query, callback) {
  userModel.findOne(query, callback);
}

function update(user) {
  write.write(user);
}

function remove(user) {
  write.write(user);
}

exports.start = start;
exports.getAll = getAll;
exports.getOne = getOne
exports.add = add;
exports.getUpdateForm = getUpdateForm;
exports.update = update;
exports.remove = remove;
exports.mongoose = mongoose;
