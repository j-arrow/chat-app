var user = require('../User/user.js');

var FRIENDS_INVITATION_TABLE_NAME = 'friends_invitation';

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
    invite: invite,
}
