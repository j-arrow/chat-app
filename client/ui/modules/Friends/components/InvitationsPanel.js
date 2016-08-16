import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import InvitationsPendingPanel from './InvitationsPendingPanel.js';
import InvitationsSentPanel from './InvitationsSentPanel.js';

const InvitationsPanel = () => (
    <Tabs>
        <Tab label='Pending'>
            <InvitationsPendingPanel />
        </Tab>
        <Tab label='Sent'>
            <InvitationsSentPanel />
        </Tab>
    </Tabs>
);

export default InvitationsPanel;
