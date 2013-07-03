/**
| \ | |         | |
|  \| | ___   __| | ___
| . ` |/ _ \ / _` |/ _ \
| |\  | (_) | (_| |  __/
|_| \_|\___/ \__,_|\___|
**/

//Extend the prototype of Array
require('./models/Array.js');

var config = require('./config')
, router = require('./router')
, handle = require('./serverRoutes')
, server = require('./protocol link/server')
, serverIo = require('./socket.io/app');

//Fixing global access log and error log to log from everywhere
var fs = require('fs')
, Log = require('./modules').log
, accessLog = new Log(config['log_level'], fs.createWriteStream('access.log', {flags:'a'}))
, errorLog = new Log(config['log_level'], fs.createWriteStream('error.log', {flags:'a'}));
global.accessLog = accessLog;
global.errorLog = errorLog;

//If server launched in debug mode, console.log working, else not
if(process.argv.indexOf('-debug') === -1) {
    console.log('Debug mode : OFF');
    //console.log = function() {};
} else console.log('Debug mode : ON');

console.log('Started app with config :\n', config);

global.reportError = function(err) {
    console.log(err);
    if(typeof err === 'string') errorLog.error(err);
    else if(typeof err === 'object') {
        errorLog.error(err.message);
        errorLog.error(err.stack);
    }
};

global.config = config;

//Start the server
server.start(router.route, handle);
serverIo.start(router.route, handle);
