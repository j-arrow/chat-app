import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import appReducer from './reducer.js';

import * as storage from 'redux-storage';
const mainReducer = storage.reducer(appReducer);
import createEngine from 'redux-storage-engine-localstorage';
const engine = createEngine('talk2me-persisted-store');

const configureStore = () => {
    const localStorageMiddleware = storage.createMiddleware(engine);

    const middlewares = [localStorageMiddleware];
    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(createLogger({
            collapsed: true,
            duration: true,
            diff: true,
        }));
    }

    const store = createStore(
        mainReducer,
        applyMiddleware(...middlewares)
    );

    const load = storage.createLoader(engine);
    load(store);
    return store;
};

export default configureStore;
