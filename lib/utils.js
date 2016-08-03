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

module.exports = {
  normalizePort: normalizePort
};
