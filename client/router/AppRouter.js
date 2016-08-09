import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import AppMaterialUIProvider from '../ui/main/AppMaterialUIProvider.js';
import Login from '../ui/pages/Login.js';
import Register from '../ui/pages/Register.js';
import HomeContainer from '../ui/pages/Home.js';
import NotFound from '../ui/pages/NotFound.js';

const AppRouter = () => (
    <Router history={browserHistory}>
        <Route path='/' component={AppMaterialUIProvider}>
            <IndexRoute component={HomeContainer}/>
            <Route path='login' component={Login} />
            <Route path='register' component={Register} />
        </Route>
        <Route path='*' component={NotFound} />
    </Router>
);

export default AppRouter;
