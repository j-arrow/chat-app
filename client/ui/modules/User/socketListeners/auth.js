import * as actions from '../reducers/auth.js';

const socket = io.connect('/');

const authSocketListeners = (store) => {
    socket.on(actions.LOG_IN_SUCCESS, () => {
        console.log('asdasd');
    });
};

export default authSocketListeners;
