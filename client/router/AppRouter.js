import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from '../ui/main/App.js';
import Login from '../ui/pages/Login.js';
import Home from '../ui/pages/Home.js';
import NotFound from '../ui/pages/NotFound.js';

const AppRouter = () => (
    <Router history={browserHistory}>
        <Route path='/' component={App}>
            <IndexRoute component={Home}/>
            <Route path='login' component={Login} />
        </Route>
        <Route path='*' component={NotFound} />
    </Router>
);

export default AppRouter;
