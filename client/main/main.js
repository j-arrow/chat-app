import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from '../router/AppRouter.js';

try {
    ReactDOM.render(
        <AppRouter />,
        document.getElementById('root')
    );
} catch(e) {
    console.log(e);
}
