var defaultState = {
    loggedIn: false,
    username: undefined,
    sessionId: undefined,
};

export const REGISTER = 'auth:REGISTER';
export const REGISTER_SUCCESS = 'auth:REGISTER_SUCCESS';
export const REGISTER_ERROR = 'auth:REGISTER_ERROR';
export const LOG_IN = 'auth:LOG_IN';
export const LOG_IN_SUCCESS = 'auth:LOG_IN_SUCCESS';
export const LOG_IN_ERROR = 'auth:LOG_IN_ERROR';
export const LOG_OUT = 'auth:LOG_OUT';
export const LOG_OUT_SUCCESS = 'auth:LOG_OUT_SUCCESS';

export const register = (registrationData) => ({
    type: REGISTER,
    username: registrationData.username,
    password: registrationData.password,
    repeatPassword: registrationData.repeatPassword,
});

export const logIn = (data) => ({
    type: LOG_IN,
    username: data.username,
    sessionId: data.sessionId,
});

export const logOut = () => ({
    type: LOG_OUT,
});

const auth = (state = defaultState, action) => {
    switch (action.type) {
        case LOG_IN:
            return {
                loggedIn: true,
                username: action.username,
                sessionId: action.sessionId,
            };
        case LOG_OUT:
            return defaultState;
        default:
            return state;
    }
};

export default auth;
