import * as actions from '../actions/auth.js';

var defaultState = {
    loggedIn: false,
    username: undefined,
    sessionId: undefined,
};
const auth = (state = defaultState, action) => {
    switch (action.type) {
        case actions.LOG_IN:
            return {
                loggedIn: true,
                username: action.username,
                sessionId: action.sessionId,
            };
        case actions.LOG_OUT:
            return defaultState;
        default:
            return state;
    }
};

export default auth;
