var friendsSocketHandler = require('./friendsSocketHandler.js');
var FRIENDS_SOCKET_NAMESPACE =
    require('../../../shared/Friends/friends.js').SOCKET.NAMESPACE;

module.exports = (io, connection, rethinkDB) => {
    var friendsNs = io.of(FRIENDS_SOCKET_NAMESPACE);
    friendsNs.on('connection', socket => {
        friendsSocketHandler(socket, rethinkDB, connection);
    });
}
