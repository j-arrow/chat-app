var logSocketAction = require('../../socket/loggingHelper.js');
var clientActions = require('../../../shared/User/auth-out.js');

var TABLE_NAME = 'user';
var ENTITY_NAME = 'auth';

var LOG_IN_SUCCESS_SUFFIX = ':LOG_IN_SUCCESS';
var LOG_IN_ERROR_SUFFIX = ':LOG_IN_ERROR';

var index = 0;

module.exports = function(socket, rethinkDB, connection) {

    socket.on(clientActions.LOG_IN, function(data) {
        logSocketAction(clientActions.LOG_IN);

        var credentials = {
            username: data.username,
            password: data.password,
        };

        rethinkDB.table(TABLE_NAME)
            .filter(credentials)
            .limit(1)
            .run(connection, function(err, cursor) {
                if (err) {
                    throw err;
                }

                cursor.next(function(err, row) {
                    if (err) {
                        if ((
                            err.name === 'ReqlDriverError' &&
                            err.message === 'No more rows in the cursor.'
                        )) {
                            var errorMessage = 'User not found';
                            socket.emit(ENTITY_NAME + LOG_IN_ERROR_SUFFIX, errorMessage);
                            return;
                        } else {
                            throw err;
                        }
                    } else {
                        var user = row;
                        console.log(user);
                        socket.emit(ENTITY_NAME + LOG_IN_SUCCESS_SUFFIX, credentials);
                    }

                });


                // console.log();
                // if (result > 1 || result === 0) {
                //     var errorMessage = 'User not found';
                //     socket.emit(ENTITY_NAME + LOG_IN_ERROR_SUFFIX, credentials);
                //     return;
                // }
                // socket.emit(ENTITY_NAME + LOG_IN_SUCCESS_SUFFIX, credentials);
            });

    });

}
