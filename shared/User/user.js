const clientAction = (name) => {
    return 'auth:client:' + name;
}

const serverAction = (name) => {
    return 'auth:server:' + name;
}

module.exports = {
    SOCKET: {
        NAMESPACE: '/USER_NS',
    },
    CLIENT: {
        SEARCH: clientAction('SEARCH'),
    },
    SERVER: {
        SEARCH_SUCCESS: serverAction('SEARCH_SUCCESS'),
        SEARCH_ERROR: serverAction('SEARCH_ERROR'),
    },
}
