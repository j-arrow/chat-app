// Socket.io changefeed events
var changefeedSocketEvents = require('../../socket/socket-events.js');
var logSocketAction = require('../../socket/helper.js');

var clientActions = require('../../../shared/todos-out.js');

var TODO_DB_NAME = 'Todo';
var TODO_ENTITY_NAME = 'todo';

module.exports = function(socket, rethinkDB, connection) {

    socket.on(clientActions.INSERT, function(todo) {
        logSocketAction(clientActions.INSERT);
        rethinkDB.table(TODO_DB_NAME)
            .insert(todo)
            .run(connection);
    });

    socket.on(clientActions.UPDATE, function(todo) {
        logSocketAction(clientActions.UPDATE);
        var id = todo.id;
        delete todo.id;
        rethinkDB.table(TODO_DB_NAME)
            .get(id)
            .update(todo)
            .run(connection);
    });

    socket.on(clientActions.DELETE, function(todo) {
        logSocketAction(clientActions.DELETE);
        var id = todo.id;
        delete todo.id;
        rethinkDB.table(TODO_DB_NAME)
            .get(id)
            .delete()
            .run(connection);
    });

    rethinkDB.table(TODO_DB_NAME)
        .changes({ includeInitial: true, squash: true })
        .run(connection)
        .then(changefeedSocketEvents(socket, TODO_ENTITY_NAME));

}
