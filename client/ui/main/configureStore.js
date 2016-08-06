import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import appReducer from './reducer.js';

const applySocketListeners = (store) => {
};

const configureStore = () => {
    const middlewares = [];
    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(createLogger({
            collapsed: true,
            duration: true,
            diff: true,
        }));
    }

    const store = createStore(
        appReducer,
        applyMiddleware(...middlewares)
    );
    applySocketListeners(store);

    return store;
};

export default configureStore;
