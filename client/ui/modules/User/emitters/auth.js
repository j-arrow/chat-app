import * as outActions from '$shared/User/auth-out.js';
import * as inActions from '../reducers/auth.js';

export const logIn = (payload, handleLogIn, errorHandler) => {
    const socket = io.connect('/');

    socket.emit(outActions.LOG_IN, payload);
    socket.on(inActions.LOG_IN_ERROR, errorHandler);

    socket.on(inActions.LOG_IN_SUCCESS, user => {
        console.log(user);
        handleLogIn(user);
    });
};
