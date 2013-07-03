var mongoose = require('../modules').mongoose;

var jobModel = mongoose.model('jobmodel', new mongoose.Schema({
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

function getList(callback) {
  jobModel.find(callback);
}

function getOne(req, res) {
  jobModel.findOne({'_id': req.params.id}, function(err, data) {
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

function add(data, client) {
	jobModel.findOne().sort('-_id').exec(function(err, jobs) {
		if(jobs == null) {
			data._id = 0;
		} else {
			data._id = jobs._id + 1;
		}
		new jobModel(data).save(function(err) {
			if(err) { console.log(err) };
			mongoose.connection.close(function() {
				console.log('Connection closed');
			});      
			if(!(client == undefined)) {
				client.send('jobRedirect');
			}  
		});
	});
}

function update(data, client) {
  var newdata = clone(data);
  delete newdata._id;
  jobModel.update({'_id': data._id}, newdata, function(err) {
      if(err) { console.log(err) };
      mongoose.connection.close(function() {
          console.log('Connection closed');
      });      
      if(!(client == undefined)) {
        client.send('jobRedirect');
      }  
  });
}

function remove(data, client) {
  jobModel.remove({'_id': parseInt(data._id)}, function(err) {
      if(err) { console.log(err) };
      mongoose.connection.close(function() {
          console.log('Connection closed');
      });
      if(!(client == undefined)) {
        client.send('jobRedirect');
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
exports.add = add;
exports.update = update;
exports.remove = remove
exports.mongoose = mongoose;
