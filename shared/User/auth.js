module.exports = {
    SOCKET: {
        NAMESPACE: '/AUTH_NS',
    },
    CLIENT: {
        REGISTER: 'auth:client:REGISTER',
        REGISTER_SUCCESS: 'auth:client:REGISTER_SUCCESS',
        REGISTER_ERROR: 'auth:client:REGISTER_ERROR',
        LOG_IN: 'auth:client:LOG_IN',
        LOG_IN_SUCCESS: 'auth:client:LOG_IN_SUCCESS',
        LOG_IN_ERROR: 'auth:client:LOG_IN_ERROR',
        LOG_OUT: 'auth:client:LOG_OUT',
        LOG_OUT_SUCCESS: 'auth:client:LOG_OUT',
    },
    SERVER: {
        REGISTER: 'auth:server:REGISTER',
        REGISTER_SUCCESS: 'auth:server:REGISTER_SUCCESS',
        REGISTER_ERROR: 'auth:server:REGISTER_ERROR',
        LOG_IN: 'auth:server:LOG_IN',
        LOG_IN_SUCCESS: 'auth:server:LOG_IN_SUCCESS',
        LOG_IN_ERROR: 'auth:server:LOG_IN_ERROR',
        LOG_OUT: 'auth:server:LOG_OUT',
        LOG_OUT_SUCCESS: 'auth:server:LOG_OUT_SUCCESS',
    },
};
