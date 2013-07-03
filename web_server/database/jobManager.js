var mongoose = require('../modules').mongoose
, write = require('./write');

var jobModel = mongoose.connection.model('jobmodel', new mongoose.Schema({
    _id: Number,
    path: String,
    winPath: String,
    linPath: String,
    macPath: String,
    owner: String,
    name: String,
    minRam: Number,
    maxRam: Number,
    minCpuFrequence: Number,
    filesCreated: Boolean,
    filesNamePatterns: String,
    isUsingCG: Boolean,
    nbRun: Number,
    archi: Number,
    parametersList: String,
    priority: Number,
    status: String,
    progress: Number,
    dir: String,
    resultFile: String
}), 'jobmodels');

function start(callback) {
  mongoose.connect('mongodb://localhost/derp', function(err) {
      if(err) { throw err; }
      else { console.log('Connected to database'); }
  });  
  
  callback;
}

function getAll(callback) {  
  jobModel.find(callback);
}

function getOne(query, callback) {
  jobModel.findOne(query, callback);
}

function add(callback) {
  jobModel.findOne().sort('-_id').exec(callback);
}

function getUpdateForm(query, callback) {
  jobModel.findOne(query, callback);
}

function update(job) {
  write.write(job);
}

function remove(job) {
  write.write(job);
}

exports.start = start;
exports.getAll = getAll;
exports.getOne = getOne
exports.add = add;
exports.getUpdateForm = getUpdateForm;
exports.update = update;
exports.remove = remove;
exports.mongoose = mongoose;
