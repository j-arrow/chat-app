const clientAction = function(name) {
    return 'auth:client:' + name;
}

const serverAction = function(name) {
    return 'auth:server:' + name;
}

module.exports = {
    SOCKET: {
        NAMESPACE: '/AUTH_NS',
    },
    CLIENT: {
        REGISTER: clientAction('REGISTER'),
        REGISTER_SUCCESS: clientAction('REGISTER_SUCCESS'),
        REGISTER_ERROR: clientAction('REGISTER_ERROR'),
        LOG_IN: clientAction('LOG_IN'),
        LOG_IN_SUCCESS: clientAction('LOG_IN_SUCCESS'),
        LOG_IN_ERROR: clientAction('LOG_IN_ERROR'),
        LOG_OUT: clientAction('LOG_OUT'),
        LOG_OUT_SUCCESS: clientAction('LOG_OUT'),
    },
    SERVER: {
        REGISTER: serverAction('REGISTER'),
        REGISTER_SUCCESS: serverAction('REGISTER_SUCCESS'),
        REGISTER_ERROR: serverAction('REGISTER_ERROR'),
        LOG_IN: serverAction('LOG_IN'),
        LOG_IN_SUCCESS: serverAction('LOG_IN_SUCCESS'),
        LOG_IN_ERROR: serverAction('LOG_IN_ERROR'),
        LOG_OUT: serverAction('LOG_OUT'),
        LOG_OUT_SUCCESS: serverAction('LOG_OUT_SUCCESS'),
    },
};
