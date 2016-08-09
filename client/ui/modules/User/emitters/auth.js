import * as outActions from '$shared/User/auth-out.js';
import * as inActions from '../reducers/auth.js';

export const register = (payload, handleRegister) => {
    const socket = io.connect('/');

    socket.emit(outActions.REGISTER, payload);

    socket.on(inActions.REGISTER_ERROR, errorMessage => {
        console.log(errorMessage);
    });

    socket.on(inActions.REGISTER_SUCCESS, registrationData => {
        handleRegister(registrationData);
    });
};

export const logIn = (payload, handleLogIn) => {
    const socket = io.connect('/');

    socket.emit(outActions.LOG_IN, payload);

    socket.on(inActions.LOG_IN_ERROR, errorMessage => {
        console.log(errorMessage);
    });

    socket.on(inActions.LOG_IN_SUCCESS, user => {
        handleLogIn(user);
    });
};
