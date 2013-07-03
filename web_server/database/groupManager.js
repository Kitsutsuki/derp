var mongoose = require('../modules').mongoose
, write = require('./write');

var groupModel = mongoose.connection.model('groupmodel', new mongoose.Schema({
    _id: Number,
    name: String,
    numberWin: Number,
    numberLin: Number,
    numberMac: Number,
    st_year: Number,
    st_month: Number,
    st_day: Number,
    st_hour: Number,
    st_min: Number,
    end_year: Number,
    end_month: Number,
    end_day: Number,
    end_hour: Number,
    end_min: Number
}), 'groupmodels');

function start(callback) {
  mongoose.connect('mongodb://localhost/derp', function(err) {
      if(err) { throw err; }
      else { console.log('Connected to database'); }
  });  
  
  callback;
}

function getAll(callback) {  
  groupModel.find(callback);
}

function getOne(query, callback) {
  groupModel.findOne(query, callback);
}

function add(callback) {
  groupModel.findOne().sort('-_id').exec(callback);
}

function getUpdateForm(query, callback) {
  groupModel.findOne(query, callback);
}

function update(group) {
  write.write(group);
}

function remove(group) {
  write.write(group);
}

exports.start = start;
exports.getAll = getAll;
exports.getOne = getOne
exports.add = add;
exports.getUpdateForm = getUpdateForm;
exports.update = update;
exports.remove = remove;
exports.mongoose = mongoose;