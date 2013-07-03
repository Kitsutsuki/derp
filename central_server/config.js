/**
This is the configuration file
**/
var c = {};

c.server_host = '127.0.0.1';
c.server_port = 7777;
c.socket_host = '127.0.0.1';
c.socket_port = 7776;
c.log_level = 'debug';
c.db = 'mongodb';
c.db_host = 'localhost';
c.db_port = 3000;
c.db_name = 'derp';
c.base_node_dir = __dirname;
c.auth_key = 'logon';

module.exports = c;
