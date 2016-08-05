#!/usr/bin/env node

var app = require('../app');
var utils = require('../lib/utils');
var http = require('http');

// get port from environment and store in Express.
var port = utils.normalizePort(process.env.PORT || 8000); // eslint-disable-line no-process-env
app.set('port', port);

// create http server
var server = http.createServer(app);

// listen on provided ports
server.listen(port);

// add error handler
server.on('error', function(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges'); // eslint-disable-line no-console
      process.exit(1); // eslint-disable-line no-process-exit
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use'); // eslint-disable-line no-console
      process.exit(1); // eslint-disable-line no-process-exit
      break;
    default:
      throw error;
  }
});

// start listening on port
server.on('listening', function() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  console.log('Listening on ' + bind); // eslint-disable-line no-console
});
