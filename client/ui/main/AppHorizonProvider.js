import React from 'react';

import AppMaterialUIProvider from './AppMaterialUIProvider.js';
import { Horizon, HorizonProvider } from 'react-hz';

const horizonInstance = Horizon({ host: '127.0.0.1:8181' });

const AppHorizonProvider = ({
    children,
}) => (
    <HorizonProvider
        instance={horizonInstance}>
        <AppMaterialUIProvider
            children={children} />
    </HorizonProvider>
);

AppHorizonProvider.propTypes = {
    children: React.PropTypes.node.isRequired,
};

export default AppHorizonProvider;