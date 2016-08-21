var user = require('../User/user.js');
var invitationsQueryApplier = require('./invitationsQueryApplier.js');

var FRIENDS_INVITATION_TABLE_NAME = 'friends_invitation';

var violatesConstrains = (existing, newData) => {
    var hasSenderId = existing('senderId').eq(newData.senderId);
    var hasRecipientId = existing('recipientId').eq(newData.recipientId);
    var isNotUnique = hasSenderId.and(hasRecipientId);

    var isRejected = existing.hasFields('dateRejected');
    var isRejectedInPast = existing('dateRejected').lt(new Date());
    var isNotRejectedInPast = isRejected.and(isRejectedInPast).not();

    // Existing invitation violates constrains ONLY if its senderId and recipientId
    // are not unique excluding situation when invitation with same senderId and
    // recipientId exists but was rejected in the past
    return isNotUnique.and(isNotRejectedInPast);
}

var searchInvitations = (rethinkDB, connection, invitationsQuery, onSuccess) => {
    var dbTable = rethinkDB.table(FRIENDS_INVITATION_TABLE_NAME);
    dbTable = invitationsQueryApplier.apply(dbTable, invitationsQuery);
    dbTable.run(connection, (err, cursor) => {
        if (err) {
            throw err;
        }

        cursor.toArray((err, invitationsObj) => {
            if (err) {
                throw err;
            }
            onSuccess(invitationsObj);
            return invitationsObj;
        });
    });
}

var checkUnique = (rethinkDB, connection, data, onUnique) => {
    rethinkDB.table(FRIENDS_INVITATION_TABLE_NAME)
        .filter(friendsInvitation => violatesConstrains(friendsInvitation, data))
        .limit(1)
        .run(connection, (err, cursor) => {
            if (err) {
                throw err;
            }
            cursor.next((err, row) => {
                if (err) {
                    if (err.name === 'ReqlDriverError' && err.message === 'No more rows in the cursor.') {
                        onUnique();
                    } else {
                        throw err;
                    }
                } else {
                    console.log(
                        FRIENDS_INVITATION_TABLE_NAME + ': constraint violation'
                    );
                    return;
                }
            });
        });
};

var invite = (rethinkDB, connection, data, onSuccess) => {
    rethinkDB.table(FRIENDS_INVITATION_TABLE_NAME)
        .insert({
            senderId: data.senderId,
            recipientId: data.recipientId,
            dateSent: new Date(),
        })
        .run(connection, (err, cursor) => {
            if (err) {
                throw err;
            }
            var friendsInvitationId = cursor.generated_keys[0];
            onSuccess(friendsInvitationId);
            return friendsInvitationId;
        });
}

module.exports = {
    searchInvitations: searchInvitations,
    checkUnique: checkUnique,
    invite: invite,
}
