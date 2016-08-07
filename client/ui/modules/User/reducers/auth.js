var defaultState = {
    loggedIn: false,
    username: null,
    id: null
};

export const LOG_IN = 'auth:LOG_IN';
export const LOG_IN_SUCCESS = 'auth:LOG_IN_SUCCESS';

export const logIn = (credentials) => ({
    type: LOG_IN,
    username: credentials.username,
    password: credentials.password,
});

const auth = (state = defaultState, action) => {
    switch (action.type) {
        case LOG_IN:
            return {
                loggedIn: true,
                username: action.username,
                id: action.id
            };
        default:
            return state;
    }
};

export default auth;
