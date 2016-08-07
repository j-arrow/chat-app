import { combineReducers } from 'redux';
import auth from 'User/reducers/auth.js';

const main = combineReducers({
    auth,
});

export default main;
