var logSocketAction = require('../../socket/loggingHelper.js');
var userConstants = require('../../../shared/User/user.js');
var user = require('../User/user.js');

module.exports = (socket, rethinkDB, connection) => {


    socket.on(userConstants.CLIENT.SEARCH, username => {
        logSocketAction(userConstants.CLIENT.SEARCH);

        try {
            user.search(rethinkDB, connection, username, users => {
                socket.emit(userConstants.SERVER.SEARCH_SUCCESS, users);
            });
        } catch (err) {
            var errorMessage = 'Server error occurred, please, try again';
            socket.emit(userConstants.SERVER.SEARCH_ERROR, errorMessage);
        }
    });

};
