var net = require('net'),
Header = require('../models/Header');

function start(route, handle) {
    
    
    var client = net.connect(config.server_port, config.server_host, function () {
        this.header = null;
        this.concatOver = true;
        this.buffer = null;
        this.isAuthenticated = true;
        
        var header = new Header(Header.REQ, Header.WORKER_CONNEC_REQ);
        var data = new Buffer(5);
        data.write(config.auth_key);
        var finalBuffer = header.appendHeader(data);
        console.log(finalBuffer);
        client.write(finalBuffer);
        console.log('Worker connected');
    });
    
    client.on('data', function(data) {
        route(this, handle, data);
    });

    client.on('error', function(err) {
        reportError(err);
    });

    client.on('end', function() {
        console.log('end');
    });
    
    client.on('close', function() {
        console.log('closing ...');
    });
}

exports.start = start;