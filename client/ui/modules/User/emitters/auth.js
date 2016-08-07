import * as shared from '$shared/User/auth-out.js';

export const logIn = (socket, credentials) => {
    socket.emit(shared.LOG_IN, credentials);
};
