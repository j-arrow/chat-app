import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Header from 'Layout/components/Header.js';
import FriendsPanel from 'Friends/components/FriendsPanel.js';
import InvitationsDialog from 'Friends/components/InvitationsDialog.js';
import ChatPanel from 'Chat/components/ChatPanel.js';
import * as authActions from 'User/actions/auth.js';
import authConstants from '$shared/User/auth.js';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
        this.showInvitationsDialog = this.showInvitationsDialog.bind(this);
        this.openChatWindow = this.openChatWindow.bind(this);

        this.prepareSocket = this.prepareSocket.bind(this);
        this.prepareSocket();
    }

    componentDidUpdate() {
        if (!this.props.loggedIn) {
            this.props.redirectToLogin();
        }
    }

    prepareSocket() {
        this.socket = io.connect(authConstants.SOCKET.NAMESPACE);
        this.socket.on(authConstants.SERVER.LOG_OUT_SUCCESS, () => {
            this.props.handleLogOut();
        });
    }

    logOut() {
        this.socket.emit(authConstants.CLIENT.LOG_OUT, this.props.sessionId);
    }

    showInvitationsDialog() {
        this.invitationsDialog.open();
    }

    openChatWindow(friend) {
        this.chatPanel.open(friend);
    }

    render() {
        const { username } = this.props;

        return (
            <div className='container-fluid'>
                <div className='row'>
                    <Header
                        username={username}
                        handleLogOut={this.logOut}
                        showInvitationsDialog={this.showInvitationsDialog} />
                </div>
                <div className='row' style={{marginTop:15}}>
                    <div className='col-xs-3'>
                        <FriendsPanel
                            onFriendClick={this.openChatWindow}
                            showInvitationsDialog={this.showInvitationsDialog} />
                    </div>
                    <div className='col-xs-9'>
                        <ChatPanel ref={
                                (chat) => this.chatPanel = chat
                            } />
                    </div>
                </div>
                <InvitationsDialog ref={
                        (dialog) => this.invitationsDialog = dialog
                    } />
            </div>
        );
    }
}

HomePage.propTypes = {
    loggedIn: React.PropTypes.bool.isRequired,
    username: React.PropTypes.string,
    redirectToLogin: React.PropTypes.func.isRequired,
};

let HomePageContainer = ({
    loggedIn,
    sessionId,
    username,
    redirectToLogin,
    handleLogOut,
}) => (
    <HomePage
        loggedIn={loggedIn}
        sessionId={sessionId}
        username={username}
        redirectToLogin={redirectToLogin}
        handleLogOut={handleLogOut} />
);

const mapStateToProps = (state, ownProps) => ({
    loggedIn: state.auth.loggedIn,
    sessionId: state.auth.sessionId,
    username: state.auth.username,
    redirectToLogin: () => {
        ownProps.router.push('/login')
    },
});

const mapDispatchToProps = (dispatch) => ({
    handleLogOut: () => {
        dispatch(authActions.logOut());
    },
});

HomePageContainer = withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(HomePageContainer)
);

export default HomePageContainer;
