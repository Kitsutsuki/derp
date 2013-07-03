var mongoose = require('../modules').mongoose
, write = require('./write');

var workerModel = mongoose.connection.model('workermodel', new mongoose.Schema({
    _id: Number,
    hostName: String,
    state: String,
    workerName: String,
    workload: String,
    ipAddress: String,
    nbOfCore: Number,
    cpuFrequence: Number,
    RAM: Number,
    os: String,
    archi: Number,
    socket: String
}), 'workermodels');

var groupModel = mongoose.connection.model('workermodel', new mongoose.Schema({
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
}), 'workermodels');

function start(callback) {
  mongoose.connect('mongodb://localhost/derp', function(err) {
      if(err) { throw err; }
      else { console.log('Connected to database'); }
  });  
  
  callback;
}

function getAll(callback) {  
  workerModel.find(callback);
}

function getOne(query, callback) {
  workerModel.findOne(query, callback);
}

function getUpdateForm(query, callback) {
  workerModel.findOne(query, callback);
}

function update(worker) {
  write.write(worker);
}

exports.start = start;
exports.getAll = getAll;
exports.getOne = getOne
exports.getUpdateForm = getUpdateForm;
exports.update = update;
exports.mongoose = mongoose;
