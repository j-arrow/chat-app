var handleSocket = require('../../socket/handler.js');
var authSocketHandler = require('./authSocketHandler.js');
var AUTH_SOCKET_NAMESPACE =
    require('../../../shared/User/auth.js').SOCKET.NAMESPACE;

module.exports = (io, connection, rethinkDB) => {
    var authNs = io.of(AUTH_SOCKET_NAMESPACE);
    authNs.on('connection', (socket) => {
        handleSocket([
            authSocketHandler
        ])(socket, rethinkDB, connection);
    });
}
