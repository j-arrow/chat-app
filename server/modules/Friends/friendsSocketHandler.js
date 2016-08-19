var logSocketAction = require('../../socket/loggingHelper.js');
var friendsConstants = require('../../../shared/Friends/friends.js');
var friends = require('./friends.js');
var user = require('../User/user.js');

module.exports = (socket, rethinkDB, connection) => {

    socket.on(friendsConstants.CLIENT.INVITE, data => {
        logSocketAction(friendsConstants.CLIENT.INVITE);

        var invitationData = {
            userId: data.userId,
            sessionId: data.sessionId,
        };

        try {
            user.getForSession(rethinkDB, connection, invitationData.sessionId, user => {
                var inviteData = {
                    senderId: user.id,
                    recipientId: invitationData.userId,
                };
                console.log('User for session FOUND');
                friends.invite(rethinkDB, connection, inviteData, invitationId => {
                    console.log('INVITATION ID:', invitationId);
                    socket.emit(friendsConstants.SERVER.INVITE_SUCCESS, {});
                });
            });
        } catch (err) {
            var errorMessage = 'Error occurred while sending friends invitation';
            socket.emit(friendsConstants.SERVER.INVITE_ERROR, errorMessage);
        }
    });

}
