var userSocketHandler = require('./userSocketHandler.js');
var USER_SOCKET_NAMESPACE =
    require('../../../shared/User/user.js').SOCKET.NAMESPACE;

module.exports = (io, connection, rethinkDB) => {
    var userNs = io.of(USER_SOCKET_NAMESPACE);
    userNs.on('connection', socket => {
        userSocketHandler(socket, rethinkDB, connection);
    });
};
