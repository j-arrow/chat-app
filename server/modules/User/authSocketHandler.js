var logSocketAction = require('../../socket/loggingHelper.js');
var authConstants = require('../../../shared/User/auth.js');

var USER_TABLE_NAME = 'user';
var SESSION_TABLE_NAME = 'session';

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

var validateCredentials = function(credentials) {
    var passwordRegexp = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])[\w\d!@#$%_]{6,15}$/;
    var usernameRegexp = /^.{5,15}/;
    if (!passwordRegexp.test(credentials.password)) {
        throw 'Password requirements not met';
    } else if (credentials.password !== credentials.repeatPassword) {
        throw 'Both passwords must match';
    } else if (!usernameRegexp.test(credentials.username)) {
        throw 'Username must be 5-15 characters long';
    }
}



module.exports = function(socket, rethinkDB, connection) {



    socket.on(authConstants.CLIENT.REGISTER, function(data) {
        logSocketAction(authConstants.CLIENT.REGISTER);

        var registrationData = {
            username: data.username,
            password: data.password,
            repeatPassword: data.repeatPassword,
        };

        try {
            validateCredentials(registrationData);
            delete registrationData.repeatPassword;

            userExists(rethinkDB, connection, { username: registrationData.username }, () => {
                createUser(rethinkDB, connection, registrationData, (userId) => {
                    socket.emit(authConstants.SERVER.REGISTER_SUCCESS, {
                        username: registrationData.username,
                    });
                });
            }, (userId) => {
                var errorMessage = 'Username already taken, please use different';
                socket.emit(authConstants.SERVER.REGISTER_ERROR, errorMessage);
            });
        } catch (err) {
            var errorMessage = 'Registration error';
            socket.emit(authConstants.SERVER.REGISTER_ERROR, errorMessage);
        }
    });



    socket.on(authConstants.CLIENT.LOG_IN, function(data) {
        logSocketAction(authConstants.CLIENT.LOG_IN);

        var credentials = {
            username: data.username,
            password: data.password,
        };

        try {
            userExists(rethinkDB, connection, credentials, () => {
                var errorMessage = 'User not found: please, check your credentials';
                socket.emit(authConstants.SERVER.LOG_IN_ERROR, errorMessage);
            }, (userId) => {
                startUserSession(rethinkDB, connection, userId, (sessionId) => {
                    socket.emit(authConstants.SERVER.LOG_IN_SUCCESS, {
                        username: credentials.username,
                        sessionId,
                    });
                });
            })
        } catch (err) {
            var errorMessage = 'Login error';
            socket.emit(authConstants.SERVER.LOG_IN_ERROR, errorMessage);
        }
    });

    socket.on(authConstants.CLIENT.LOG_OUT, function(sessionId) {
        logSocketAction(authConstants.CLIENT.LOG_OUT);

        try {
            endUserSession(rethinkDB, connection, sessionId, () => {
                socket.emit(authConstants.SERVER.LOG_OUT_SUCCESS, {});
            });
        } catch (err) {
            throw err;
        }
    });



}
