var logSocketAction = require('../../socket/loggingHelper.js');
var authConstants = require('../../../shared/User/auth.js');
var user = require('./user.js');

var validateCredentials = (credentials) => {
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



module.exports = (socket, rethinkDB, connection) => {



    socket.on(authConstants.CLIENT.REGISTER, (data) => {
        logSocketAction(authConstants.CLIENT.REGISTER);

        var registrationData = {
            username: data.username,
            password: data.password,
            repeatPassword: data.repeatPassword,
        };

        try {
            validateCredentials(registrationData);
            delete registrationData.repeatPassword;

            user.exists(rethinkDB, connection, { username: registrationData.username }, () => {
                user.create(rethinkDB, connection, registrationData, (userId) => {
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



    socket.on(authConstants.CLIENT.LOG_IN, (data) => {
        logSocketAction(authConstants.CLIENT.LOG_IN);

        var credentials = {
            username: data.username,
            password: data.password,
        };

        try {
            user.exists(rethinkDB, connection, credentials, () => {
                var errorMessage = 'User not found: please, check your credentials';
                socket.emit(authConstants.SERVER.LOG_IN_ERROR, errorMessage);
            }, (userId) => {
                user.startSession(rethinkDB, connection, userId, (sessionId) => {
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

    socket.on(authConstants.CLIENT.LOG_OUT, (sessionId) => {
        logSocketAction(authConstants.CLIENT.LOG_OUT);

        try {
            user.endSession(rethinkDB, connection, sessionId, () => {
                socket.emit(authConstants.SERVER.LOG_OUT_SUCCESS, {});
            });
        } catch (err) {
            throw err;
        }
    });



}
