import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import InvitationsPendingPanel from './InvitationsPendingPanel.js';
import InvitationsSentPanel from './InvitationsSentPanel.js';
import { connect } from 'react-redux';

class InvitationsPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sentInvitations: [],
        };
    }

    render() {
        let { sentInvitations } = this.state;

        return (
            <Tabs>
                <Tab label='Sent'>
                    <InvitationsSentPanel
                        invitations={sentInvitations} />
                </Tab>
                <Tab label='Pending'>
                    <InvitationsPendingPanel />
                </Tab>
            </Tabs>
        );
    }
}

let InvitationsPanelContainer = ({
    sessionId,
}) => (
    <InvitationsPanel
        sessionId={sessionId} />
);

const mapStateToProps = (state) => ({
    sessionId: state.auth.sessionId,
});

InvitationsPanelContainer = connect(
    mapStateToProps
)(InvitationsPanelContainer);

export default InvitationsPanelContainer;
