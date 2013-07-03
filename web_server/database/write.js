var net = require('net')
, Header = require('../Header');

function write(data) {
  console.log(data)
  
  var client = net.connect(7777,"127.0.0.1", function() {
      var json = JSON.stringify(data)
      console.log('Connected to job server');
      var header = new Header("\0REQ",3);
      var buff = new Buffer(json.length);
      buff.write(json);
      var finalBuffer = header.appendHeader(buff);
      console.log(header.createHeader());
      console.log(buff);
      console.log(finalBuffer.toString());
      client.write(finalBuffer);
      console.log("Sending FIN packet");
      client.end();
      console.log('Disconnected from job server');
  });
}

exports.write = write;
