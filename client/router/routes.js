import Home from '../ui/pages/Home.js';
import NotFound from '../ui/pages/NotFound.js';

const routes = [
    {
        path: '/',
        component: Home
    }, {
        path: '*',
        component: NotFound
    },
];

export default routes;
