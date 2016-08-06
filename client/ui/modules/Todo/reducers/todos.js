export const INSERT = 'todo:INSERT';
export const UPDATE = 'todo:UPDATE';
export const DELETE = 'todo:DELETE';

const todos = (state = [], action) => {
    const todoIndex = () => {
        return state.findIndex(thisTodo => {
            return thisTodo && thisTodo.id === action.todo.id;
        });
    };

    switch (action.type) {
        case INSERT: {
            let index = todoIndex();
            if (index < 0) {
                return [
                    ...state,
                    action.todo
                ];
            }
            return state;
        }

        case UPDATE: {
            let index = todoIndex();
            if (index > -1) {
                let updatedTodo = {
                    ...state[index],
                    ...action.todo,
                }
                return [
                    ...state.slice(0, index),
                    updatedTodo,
                    ...state.slice(index + 1)
                ];
            }
            return state;
        }

        case DELETE: {
            let index = todoIndex();
            if (index > -1) {
                return [
                    ...state.slice(0, index),
                    ...state.slice(index + 1)
                ];
            }
            return state;
        }

        default: {
            return state;
        }
    }
};

export default todos;
