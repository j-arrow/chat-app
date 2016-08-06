import { combineReducers } from 'redux';

import todos from 'Todo/reducers/todos.js';

const main = combineReducers({
    todos,
});

export default main;
