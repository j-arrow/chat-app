var defaultState = {
    loggedIn: false,
    username: null,
};

export const LOG_IN = 'auth:LOG_IN';
export const LOG_IN_SUCCESS = 'auth:LOG_IN_SUCCESS';
export const LOG_IN_ERROR = 'auth:LOG_IN_ERROR';

export const logIn = (user) => ({
    type: LOG_IN,
    username: user.username,
    password: user.password,
});

const auth = (state = defaultState, action) => {
    switch (action.type) {
        case LOG_IN:
            return {
                loggedIn: true,
                username: action.username,
            };
        default:
            return state;
    }
};

export default auth;
