import React from 'react';
import App from './App.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const AppMaterialUIProvider = ({
    children,
}) => (
    <MuiThemeProvider>
        <App
            children={children} />
    </MuiThemeProvider>
);

AppMaterialUIProvider.propTypes = {
    children: React.PropTypes.node.isRequired,
};

export default AppMaterialUIProvider;
