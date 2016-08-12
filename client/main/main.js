import React from 'react';
import ReactDOM from 'react-dom';
import RedBox from 'redbox-react';

import AppRouter from '../router/AppRouter.js';

try {
    ReactDOM.render(
        <AppRouter />,
        document.getElementById('root')
    );
} catch(e) {
    console.log(e);
    ReactDOM.render(
        <RedBox error={e} />,
        document.getElementById('root')
    );
}
