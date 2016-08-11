var handleSocket = require('../../socket/handler.js');
var authSocketHandler = require('./authSocketHandler.js');
var AUTH_SOCKET_NAMESPACE =
    require('../../../shared/User/auth-out.js').SOCKET_NAMESPACE;

module.exports = function(io, connection, rethinkDB) {
    var authNs = io.of(AUTH_SOCKET_NAMESPACE);
    authNs.on('connection', function(socket) {
        handleSocket([
            authSocketHandler
        ])(socket, rethinkDB, connection);
    });
}
