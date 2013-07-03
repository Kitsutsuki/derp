var mongoose = require('../modules').mongoose;

var userModel = mongoose.model('usermodel', new mongoose.Schema({
    _id: Number,
    login: String,
    pass: String,
    status: String,
    users: String, 
    jobs: String
}), 'usermodels');

function start(callback) {
  mongoose.connect(config.db + '://' + config.db_host + ':' + config.db_host + '/' + config.db_name, function(err) {
      if(err) { throw err; }
      else { console.log('Connected to database'); }
  });  
  callback;
}

function init() {
  userModel.count({'_id': 0}, function(err, count) {
			if(err) { throw err; }
			if(count == 0) {
			  var data = {
			    _id: 0,
			    login: 'admin',
			    pass: 'admin',
			    status: 'Admin',
			    jobs: '',
				};
				var defaultUser = new userModel(data);				
				defaultUser.save(function(err) {
						if(err) { throw err; }
						console.log('New user added :');			
						console.log(data);			
						mongoose.connection.close(function() {
						    console.log('Connection closed');
						});	
				});
			}
			else {
			  console.log('Database already initalized');			  
			  mongoose.connection.close(function() {
			      console.log('Connection closed');
			  });	
			}
	});	
}

function getList(callback) {
  userModel.find(callback);
}

function getOne(req, res) {
  userModel.findOne({'_id': req.params.id}, function(err, data) {
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
  userModel.findOne().sort('-_id').exec(function(err, users) {
      if(users == null) {
        data._id = 0;
      } else {
        data._id = users._id + 1;
      }
      data.jobs = 'none';
      data._id = users._id + 1;
      new userModel(data).save(function(err) {
          if(err) { console.log(err) };
          mongoose.connection.close(function() {
              console.log('Connection closed');
          });
          if(!(client == undefined)) {
            client.send('userRedirect');
          }
      });
  });
}

function update(data, client) {
  var newdata = clone(data);
  delete newdata._id;
  userModel.update({'_id': data._id}, newdata, function(err) {
      if(err) { console.log(err) };
      mongoose.connection.close(function() {
          console.log('Connection closed');
      });      
      if(!(client == undefined)) {
        client.send('userRedirect');
      } 
  });
}

function remove(data, client) {
  userModel.remove({'_id': parseInt(data._id)}, function(err) {
      if(err) { console.log(err) };
      mongoose.connection.close(function() {
          console.log('Connection closed');
      });
      if(!(client == undefined)) {
        client.send('userRedirect');
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
exports.init = init;
exports.getList = getList;
exports.getOne = getOne
exports.add = add;
exports.update = update;
exports.remove = remove
exports.mongoose = mongoose;
