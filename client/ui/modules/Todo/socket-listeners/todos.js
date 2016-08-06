import * as actions from '../reducers/todos.js';

// import io from 'socket.io-client';
const socket = io.connect('/');

const todosSocketListeners = (store) => {
    socket.on(actions.INSERT, todo => {
        store.dispatch({
            type: actions.INSERT,
            todo,
        });
    });

    socket.on(actions.UPDATE, todo => {
        store.dispatch({
            type: actions.UPDATE,
            todo,
        });
    });

    socket.on(actions.DELETE, todo => {
        store.dispatch({
            type: actions.DELETE,
            todo,
        });
    });
};

export default todosSocketListeners;
