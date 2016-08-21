const clientAction = (name) => {
    return 'friends:client:' + name;
}

const serverAction = (name) => {
    return 'friends:server:' + name;
}

module.exports = {
    SOCKET: {
        NAMESPACE: '/FRIENDS_NS',
    },
    CLIENT: {
        SEARCH_INVITATIONS: clientAction('SEARCH_INVITATIONS'),
        INVITE: clientAction('INVITE'),
    },
    SERVER: {
        SEARCH_SENT_INVITATIONS_SUCCESS: clientAction('SEARCH_SENT_INVITATIONS_SUCCESS'),
        SEARCH_SENT_INVITATIONS_ERROR: clientAction('SEARCH_SENT_INVITATIONS_ERROR'),
        SEARCH_PENDING_INVITATIONS_SUCCESS: clientAction('SEARCH_PENDING_INVITATIONS_SUCCESS'),
        SEARCH_PENDING_INVITATIONS_ERROR: clientAction('SEARCH_PENDING_INVITATIONS_ERROR'),
        INVITE_SUCCESS: serverAction('INVITE_SUCCESS'),
        INVITE_ERROR: serverAction('INVITE_ERROR'),
    },
};
