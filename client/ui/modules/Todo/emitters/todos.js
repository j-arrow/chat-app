import * as shared from '../../../../../shared/todos-out.js';

export const emitInsert = (socket, todo) => {
    socket.emit(shared.INSERT, todo);
};

export const emitUpdate = (socket, todo) => {
    socket.emit(shared.UPDATE, todo);
};

export const emitDelete = (socket, id) => {
    socket.emit(shared.DELETE, id);
};
