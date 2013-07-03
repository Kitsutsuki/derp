/**
| \ | |         | |
|  \| | ___   __| | ___
| . ` |/ _ \ / _` |/ _ \
| |\  | (_) | (_| |  __/
|_| \_|\___/ \__,_|\___|
**/

//Extend the prototype of Array
require('../models/Array.js');

var config = require('../config')
, worker = require('./worker')
, router = require('../router')
, handle = require('./workerRoutes');

//Fixing global access log and error log to log from everywhere
var fs = require('fs')
, Log = require('log')
, accessLog = new Log(config['log_level'], fs.createWriteStream('access.log', {flags:'a'}))
, errorLog = new Log(config['log_level'], fs.createWriteStream('error.log', {flags:'a'}));
global.accessLog = accessLog;
global.errorLog = errorLog;

//If worker launched in debug mode, console.log working, else not
if(process.argv.indexOf('-debug') === -1) {
    console.log('Debug mode : OFF');
    console.log = function() {};
} else console.log('Debug mode : ON');

console.log('Started worker with config :\n', config);

global.config = config;

//Start the worker
worker.start(router.route, handle);
