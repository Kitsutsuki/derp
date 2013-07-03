// SERVEUR HTTP

var express = require('./modules').express
, general = require('./routes/general')
, user = require('./routes/user')
, job = require('./routes/job')
, group = require('./routes/group')
, worker = require('./routes/worker')
, config = require('./config')
, path = require('path')
, dbManager = require('./DBManager');

var app = express();

app.listen(3000, function(req, res) {
		console.log('listenning on 3000');		
});

// CONFIGURATION

app.set('port', process.env.PORT || config.http_port);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.cookieParser());
app.use(express.session({secret: '1234567890AZERTY'}));
app.use(express.favicon());
app.use(express.bodyParser());
app.use(express.static(path.join(__dirname, 'public')));
/*app.use(express.basicAuth(function(user, pass, callback) {
    normalAuth(user, pass, function(result) {
        callback(result);
    })
}));


function normalAuth(user, pass, callbackResult) {
  dbManager.start(userManager.list(function(err, data) {
      if(err) {throw err;}
      for(var i in data) {
        if(data[i].login == user && data[i].pass == pass) {
          callbackResult(true);
          break;
        }
        else {
          callbackResult(false);
        }
      }
      dbManager.mongoose.connection.close();
  }));
}*/

app.get('/', general.home);

app.get('/job',  job.list);
app.get('/job/nouveau', job.add);
app.get('/job/details/:id', job.details);
app.get('/job/modifier/:id', job.modify);
app.get('/job/supprimer/:id', job.deleteRedirection);
app.post('/job/nouveau', job.addRedirection);
app.post('/job/modifier/:id', job.modifyRedirection);

app.get('/groupe',  group.list);
app.get('/groupe/nouveau', group.add);
app.get('/groupe/details/:id', group.details);
app.get('/groupe/modifier/:id', group.modify);
app.get('/groupe/supprimer/:id', group.deleteRedirection);
app.post('/groupe/nouveau', group.addRedirection);
app.post('/groupe/modifier/:id', group.modifyRedirection);

app.get('/utilisateur',  user.list);
app.get('/utilisateur/nouveau', user.add);
app.get('/utilisateur/details/:id', user.details);
app.get('/utilisateur/modifier/:id', user.modify);
app.get('/utilisateur/supprimer/:id', user.deleteRedirection);
app.post('/utilisateur/nouveau', user.addRedirection);
app.post('/utilisateur/modifier/:id', user.modifyRedirection);

app.get('/worker',  worker.list);
app.get('/worker/details/:id', worker.details);
app.get('/worker/modifier/:id', worker.modify);
app.post('/worker/modifier/:id', worker.modifyRedirection);

app.get('*', general.general);
