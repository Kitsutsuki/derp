var mongoose = require('../modules').mongoose;

var workerModel = mongoose.connection.model('workermodel', new mongoose.Schema({
    _id: Number,
    hostName: String,
    state: String,
    groupName: String,
    workload: String,
    ipAddress: String,
    nbOfCore: Number,
    cpuFrequence: Number,
    RAM: Number,
    os: String,
    archi: Number,
    socket: String
}), 'workermodels');

function start(callback) {
  mongoose.connect('mongodb://localhost/derp', function(err) {
      if(err) { throw err; }
      else { console.log('Connected to database'); }
  });  
  callback;
}

function getList(callback) {
  workerModel.find(callback);
}

function getOne(req, res) {
  workerModel.findOne({'_id': req.params.id}, function(err, data) {
      if(err) { throw err; }
      else {
        console.log('Getting details from db...');
        console.log('OK');
      }
      mongoose.connection.close(function() {
          console.log('Connection closed');
      });
  });
}

function update(data, client) {
  var newdata = clone(data);
  delete newdata._id;
  console.log(newdata);
  console.log(data);
  workerModel.update({'_id': data._id}, newdata, function(err) {
      if(err) { console.log(err) };
      mongoose.connection.close(function() {
          console.log('Connection closed');
      });      
      if(!(client == undefined)) {
        client.send('workerRedirect');
      }  
  });
}

function clone(srcInstance) {
	if(typeof(srcInstance) != 'object' || srcInstance == null) {
		return srcInstance;
	}
	var newInstance = srcInstance.constructor();
	for(var i in srcInstance) {
		newInstance[i] = clone(srcInstance[i]);
	}
	return newInstance;
}

exports.start = start;
exports.getList = getList;
exports.getOne = getOne
exports.update = update;
exports.mongoose = mongoose;
