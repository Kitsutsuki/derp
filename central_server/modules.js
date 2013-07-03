var mongoose = require('mongoose')
, underscore = require('underscore')
, fs = require('fs')
, XMLWriter = require('xml-writer')
, ZipStream = require('zipstream')
, each = require('each')
, util = require('util')
, log = require('log')
, events = require('events')
, io = require('socket.io');

exports.mongoose = mongoose;
exports.underscore = underscore;
exports.fs = fs;
exports.XMLWriter = XMLWriter;
exports.ZipStream = ZipStream;
exports.each = each;
exports.util = util;
exports.log = log;
exports.events = events;
exports.io = io;

