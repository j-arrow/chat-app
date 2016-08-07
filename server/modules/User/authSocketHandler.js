var logSocketAction = require('../../socket/loggingHelper.js');
var clientActions = require('../../../shared/User/auth-out.js');

var TABLE_NAME = 'user';
var ENTITY_NAME = 'auth';

var LOG_IN_SUCCESS_SUFFIX = ':LOG_IN_SUCCESS';
var LOG_IN_ERROR_SUFFIX = ':LOG_IN_ERROR';

module.exports = function(socket, rethinkDB, connection) {

    socket.on(clientActions.LOG_IN, function(credentials) {
        logSocketAction(clientActions.LOG_IN);

        rethinkDB.table(TABLE_NAME)
            .filter(credentials)
            .count()
            .run(connection, function(err, result) {
                if (err) {
                    throw err;
                }
                if (result > 1 || result === 0) {
                    socket.emit(ENTITY_NAME + LOG_IN_ERROR_SUFFIX, credentials);
                    return;
                }
                
                socket.emit(ENTITY_NAME + LOG_IN_SUCCESS_SUFFIX, credentials);
            });

        // rethinkDB.table(TABLE_NAME)
        //     .changes({ includeInitial: true, squash: true })
        //     .run(connection)
        //     .then(changefeedSocketEvents(socket, TABLE_NAME));
    });

}
