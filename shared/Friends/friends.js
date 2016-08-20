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
        INVITE: clientAction('INVITE'),
    },
    SERVER: {
        INVITE_SUCCESS: serverAction('INVITE_SUCCESS'),
        INVITE_ERROR: serverAction('INVITE_ERROR'),
    },
};
