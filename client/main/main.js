import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from '../router/routes.js';
import App from '../ui/main/App.js';

const rootRoute = {
    component: App,
    childRoutes: routes,
};

try {
    ReactDOM.render(
        <Router
            history={browserHistory}
            routes={rootRoute} />,
        document.getElementById('root')
    );
} catch(e) {
    console.log(e);
}
