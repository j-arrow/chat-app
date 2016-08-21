import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import InvitationsPendingPanel from './InvitationsPendingPanel.js';
import InvitationsSentPanel from './InvitationsSentPanel.js';
import { connect } from 'react-redux';
import friendsConstants from '$shared/Friends/friends.js';

class InvitationsPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sentInvitations: [],
        };

        this.prepareFriendsSocket();
        this.searchSentInvitations();
    }

    prepareFriendsSocket() {
        this.friendsSocket = io.connect(friendsConstants.SOCKET.NAMESPACE);
        this.friendsSocket.on(friendsConstants.SERVER.SEARCH_SENT_INVITATIONS_SUCCESS, sentInvitations => {
            this.setState({
                sentInvitations,
            });
        });
        this.friendsSocket.on(friendsConstants.SERVER.SEARCH_SENT_INVITATIONS_ERROR, errorMessage => {
            console.log(errorMessage);
        });
    }

    searchSentInvitations() {
        this.friendsSocket.emit(friendsConstants.CLIENT.SEARCH_INVITATIONS, {
            type: 'sent',
            sessionId: this.props.sessionId,
        });
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
