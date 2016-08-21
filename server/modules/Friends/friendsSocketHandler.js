var logSocketAction = require('../../socket/loggingHelper.js');
var friendsConstants = require('../../../shared/Friends/friends.js');
var friends = require('./friends.js');
var user = require('../User/user.js');

module.exports = (socket, rethinkDB, connection) => {

    socket.on(friendsConstants.CLIENT.SEARCH_INVITATIONS, query => {
        logSocketAction(friendsConstants.CLIENT.SEARCH_INVITATIONS);

        try {
            user.getSession(rethinkDB, connection, query.sessionId, session => {
                delete query.sessionId;
                query.userId = session.userId;
                friends.searchInvitations(rethinkDB, connection, query, invitationsWithRecipients => {
                    if (query.type === 'sent') {
                        var invitations = invitationsWithRecipients.map(element => ({
                            id: element.left.id,
                            username: element.right.username,
                        }));
                        socket.emit(friendsConstants.SERVER.SEARCH_SENT_INVITATIONS_SUCCESS, invitations);
                    } else if (query.type === 'pending') {
                        // TODO later
                    }
                });
            })
        } catch (err) {
            var errorMessage = 'Server error occurred, please, try again';
            if (query.type === 'sent') {
                socket.emit(friendsConstants.SERVER.SEARCH_SENT_INVITATIONS_ERROR, errorMessage);
            } else if (query.type === 'pending') {
                // TODO later
            }
        }
    });

    socket.on(friendsConstants.CLIENT.INVITE, data => {
        logSocketAction(friendsConstants.CLIENT.INVITE);

        var invitationData = {
            userId: data.userId,
            sessionId: data.sessionId,
        };

        try {
            user.getSession(rethinkDB, connection, invitationData.sessionId, session => {
                var inviteData = {
                    senderId: session.userId,
                    recipientId: invitationData.userId,
                };
                friends.checkUnique(rethinkDB, connection, inviteData, () => {
                    friends.invite(rethinkDB, connection, inviteData, invitationId => {
                        socket.emit(friendsConstants.SERVER.INVITE_SUCCESS, {});
                    });
                });
            });
        } catch (err) {
            var errorMessage = 'Error occurred while sending friends invitation';
            socket.emit(friendsConstants.SERVER.INVITE_ERROR, errorMessage);
        }
    });

}
