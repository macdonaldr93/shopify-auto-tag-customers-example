#!/usr/bin/env node

var app = require('../app');
var debug = require('debug')('express:server');
var http = require('http');

//get port from environment and store in Express.
var port = normalizePort(process.env.PORT || 8000); // eslint-disable-line no-process-env
app.set('port', port);

//create http server
var server = http.createServer(app);

//listen on provided ports
server.listen(port);

//add error handler
server.on('error', onError);

//start listening on port
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  var portInt = parseInt(val, 10);

  if (isNaN(portInt)) {
    // named pipe
    return val;
  }

  if (portInt >= 0) {
    // port number
    return portInt;
  }

  return false;
}

/**
 * Event listener for HTTP server 'error' event.
 */
function onError(error) {
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
}

/**
 * Event listener for HTTP server 'listening' event.
 */
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
