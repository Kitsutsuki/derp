var mongoose = require('../modules').mongoose;

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
		if(err) { console.log(err); }
		else { console.log('Connected to database'); }
	});  
	callback;
}

function getList(callback) {
	groupModel.find(callback);
}

function getOne(req, res) {
	groupModel.findOne({'_id': req.params.id}, function(err, data) {
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
	groupModel.findOne().sort('-_id').exec(function(err, groups) {
		if(groups == null) {
			data._id = 0;
		} else {
			data._id = groups._id + 1;
		}
		new groupModel(data).save(function(err) {
			if(err) { console.log(err) };
			mongoose.connection.close(function() {
				console.log('Connection closed');
			});      
			if(!(client == undefined)) {
				client.send('groupRedirect');
			}  
		});
	});
}

function update(data, client) {
	var newdata = clone(data);
	delete newdata._id;
	groupModel.update({'_id': data._id}, newdata, function(err) {
		if(err) { console.log(err) };
		mongoose.connection.close(function() {
			console.log('Connection closed');
		});      
		if(!(client == undefined)) {
			client.send('groupRedirect');
		}  
	});
}

function remove(data, client) {
	groupModel.remove({'_id': parseInt(data._id)}, function(err) {
		if(err) { console.log(err) };
		mongoose.connection.close(function() {
			console.log('Connection closed');
		});
		if(!(client == undefined)) {
			client.send('groupRedirect');
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