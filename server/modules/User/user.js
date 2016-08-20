var USER_TABLE_NAME = 'user';
var SESSION_TABLE_NAME = 'session';

var search = (rethinkDB, connection, username, onSuccess) => {
    rethinkDB.table(USER_TABLE_NAME)
        .filter(user => {
            var escaped = username.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
            // escaped - any special characters (e.g. '$') are escaped
            // to be used as regexp
            return user('username').match('(?i)' + escaped);
        })
        .run(connection, (err, cursor) => {
            if (err) {
                throw err;
            }

            cursor.toArray((err, usersObj) => {
                if (err) {
                    throw err;
                }
                onSuccess(usersObj);
                return usersObj;
            });
        });
}

var getForSession = (rethinkDB, connection, sessionId, onSuccess) => {
    rethinkDB.table(SESSION_TABLE_NAME)
        .get(sessionId)
        .run(connection, (err, row) => {
            if (err) {
                throw err;
            }
            onSuccess(row);
            return row;
        });
}

var create = (rethinkDB, connection, data, onSuccess) => {
    rethinkDB.table(USER_TABLE_NAME)
        .insert({
            username: data.username,
            password: data.password,
        })
        .run(connection, (err, cursor) => {
            if (err) {
                throw err;
            }
            var userId = cursor.generated_keys[0];
            onSuccess(userId);
            return userId;
        });
}

var exists = (rethinkDB, connection, data, onMissing, onFound) => {
    rethinkDB.table(USER_TABLE_NAME)
        .filter(data)
        .limit(1)
        .run(connection, (err, cursor) => {
            if (err) {
                throw err;
            }
            cursor.next((err, row) => {
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

var startSession = (rethinkDB, connection, userId, onSuccess) => {
    rethinkDB.table(SESSION_TABLE_NAME)
        .insert({
            userId,
            startDate: new Date(),
        })
        .run(connection, (err, cursor) => {
            if (err) {
                throw err;
            }
            var sessionId = cursor.generated_keys[0];
            onSuccess(sessionId);
            return sessionId;
        });
}

var endSession = (rethinkDB, connection, sessionId, onSuccess) => {
    rethinkDB.table(SESSION_TABLE_NAME)
        .get(sessionId)
        .update({
            endDate: new Date(),
        })
        .run(connection, (err, cursor) => {
            if (err) {
                throw err;
            }
            onSuccess();
        });
}

module.exports = {
    search: search,
    getForSession: getForSession,
    create: create,
    exists: exists,
    startSession: startSession,
    endSession: endSession,
}
