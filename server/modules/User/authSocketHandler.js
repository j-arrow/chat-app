var logSocketAction = require('../../socket/loggingHelper.js');
var clientActions = require('../../../shared/User/auth-out.js');

var TABLE_NAME = 'user';
var ENTITY_NAME = 'auth';

var REGISTER_SUCCESS_SUFFIX = ':REGISTER_SUCCESS';
var REGISTER_ERROR_SUFFIX = ':REGISTER_ERROR';
var LOG_IN_SUCCESS_SUFFIX = ':LOG_IN_SUCCESS';
var LOG_IN_ERROR_SUFFIX = ':LOG_IN_ERROR';

module.exports = function(socket, rethinkDB, connection) {



    socket.on(clientActions.REGISTER, function(data) {
        logSocketAction(clientActions.REGISTER);

        var registrationData = {
            username: data.username,
            password: data.password,
            repeatPassword: data.repeatPassword,
        };

        rethinkDB.table(TABLE_NAME)
            .filter({
                username: registrationData.username,
            })
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
                            rethinkDB.table(TABLE_NAME)
                                .insert({
                                    username: registrationData.username,
                                    password: registrationData.password,
                                })
                                .run(connection);

                            socket.emit(ENTITY_NAME + REGISTER_SUCCESS_SUFFIX, registrationData.username);
                            return;
                        } else {
                            var errorMessage = 'Registration error';
                            socket.emit(ENTITY_NAME + REGISTER_ERROR_SUFFIX, errorMessage);
                        }
                    } else {
                        var errorMessage = 'Registration error';
                        socket.emit(ENTITY_NAME + REGISTER_ERROR_SUFFIX, errorMessage);
                    }

                });
            });
    });



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
                        socket.emit(ENTITY_NAME + LOG_IN_SUCCESS_SUFFIX, row.username);
                    }

                });
            });

    });



}
