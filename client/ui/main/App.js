import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './configureStore.js';
import { NotificationContainer } from 'react-notifications';

const store = configureStore();

const App = ({
    children,
}) => (
    <div>
        <NotificationContainer />
        <Provider store={store}>
            {children}
        </Provider>
    </div>
);

App.propTypes = {
    children: React.PropTypes.node,
};

export default App;
