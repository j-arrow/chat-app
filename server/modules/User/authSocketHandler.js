var logSocketAction = require('../../socket/loggingHelper.js');
var clientActions = require('../../../shared/User/auth-out.js');

var USER_TABLE_NAME = 'user';
var SESSION_TABLE_NAME = 'session';

var ENTITY_NAME = 'auth';

var REGISTER_SUCCESS_SUFFIX = ':REGISTER_SUCCESS';
var REGISTER_ERROR_SUFFIX = ':REGISTER_ERROR';
var LOG_IN_SUCCESS_SUFFIX = ':LOG_IN_SUCCESS';
var LOG_IN_ERROR_SUFFIX = ':LOG_IN_ERROR';
var LOG_OUT_SUCCESS_SUFFIX = ':LOG_OUT_SUCCESS';

var userExists = function(rethinkDB, connection, data, onMissing, onFound) {
    rethinkDB.table(USER_TABLE_NAME)
        .filter(data)
        .limit(1)
        .run(connection, function(err, cursor) {
            if (err) {
                throw err;
            }
            cursor.next(function(err, row) {
                if (err) {
                    if (err.name === 'ReqlDriverError' && err.message === 'No more rows in the cursor.') {
                        onMissing();
                        return false;
                    } else {
                        throw err;
                    }
                } else {
                    onFound(row.id);
                    return true;
                }

            });
        });
};

var createUser = function(rethinkDB, connection, data, onSuccess) {
    rethinkDB.table(USER_TABLE_NAME)
        .insert({
            username: data.username,
            password: data.password,
        })
        .run(connection, function(err, cursor) {
            if (err) {
                throw err;
            }
            var userId = cursor.generated_keys[0];
            onSuccess(userId);
            return userId;
        });
}

var endUserSession = function(rethinkDB, connection, sessionId, onSuccess) {
    rethinkDB.table(SESSION_TABLE_NAME)
        .get(sessionId)
        .update({
            endDate: new Date(),
        })
        .run(connection, function(err, cursor) {
            if (err) {
                throw err;
            }
            onSuccess();
        });
}

var startUserSession = function(rethinkDB, connection, userId, onSuccess) {
    rethinkDB.table(SESSION_TABLE_NAME)
        .insert({
            userId,
            startDate: new Date(),
        })
        .run(connection, function(err, cursor) {
            if (err) {
                throw err;
            }
            var sessionId = cursor.generated_keys[0];
            onSuccess(sessionId);
            return sessionId;
        });
}





module.exports = function(socket, rethinkDB, connection) {



    socket.on(clientActions.REGISTER, function(data) {
        logSocketAction(clientActions.REGISTER);

        var registrationData = {
            username: data.username,
            password: data.password
        };

        try {
            userExists(rethinkDB, connection, { username: registrationData.username }, () => {
                createUser(rethinkDB, connection, registrationData, (userId) => {
                    socket.emit(ENTITY_NAME + REGISTER_SUCCESS_SUFFIX, {
                        username: registrationData.username,
                    });
                });
            }, (userId) => {
                var errorMessage = 'Username already taken, please use different';
                socket.emit(ENTITY_NAME + REGISTER_ERROR_SUFFIX, errorMessage);
            });
        } catch (err) {
            var errorMessage = 'Registration error';
            socket.emit(ENTITY_NAME + REGISTER_ERROR_SUFFIX, errorMessage);
        }
    });



    socket.on(clientActions.LOG_IN, function(data) {
        logSocketAction(clientActions.LOG_IN);

        var credentials = {
            username: data.username,
            password: data.password,
        };

        try {
            userExists(rethinkDB, connection, credentials, () => {
                var errorMessage = 'User not found: please, check your credentials';
                socket.emit(ENTITY_NAME + LOG_IN_ERROR_SUFFIX, errorMessage);
            }, (userId) => {
                startUserSession(rethinkDB, connection, userId, (sessionId) => {
                    socket.emit(ENTITY_NAME + LOG_IN_SUCCESS_SUFFIX, {
                        username: credentials.username,
                        sessionId,
                    });
                });
            })
        } catch (err) {
            var errorMessage = 'Login error';
            socket.emit(ENTITY_NAME + LOG_IN_ERROR_SUFFIX, errorMessage);
        }
    });

    socket.on(clientActions.LOG_OUT, function(sessionId) {
        logSocketAction(clientActions.LOG_OUT);

        try {
            endUserSession(rethinkDB, connection, sessionId, () => {
                socket.emit(ENTITY_NAME + LOG_OUT_SUCCESS_SUFFIX, {});
            });
        } catch (err) {
            throw err;
        }
    });



}
