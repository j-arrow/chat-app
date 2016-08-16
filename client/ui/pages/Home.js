import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Header from 'Layout/components/Header.js';
import FriendsPanel from 'Friends/components/FriendsPanel.js';
import InvitationsDialog from 'Friends/components/InvitationsDialog.js';
import ChatPanel from 'Chat/components/ChatPanel.js';
import * as inActions from 'User/reducers/auth.js';
import * as outActions from '$shared/User/auth-out.js';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
        this.showInvitationsDialog = this.showInvitationsDialog.bind(this);

        this.prepareSocket = this.prepareSocket.bind(this);
        this.prepareSocket();
    }

    componentDidUpdate() {
        if (!this.props.loggedIn) {
            this.props.redirectToLogin();
        }
    }

    prepareSocket() {
        this.socket = io.connect(outActions.SOCKET_NAMESPACE);
        this.socket.on(inActions.LOG_OUT_SUCCESS, () => {
            this.props.handleLogOut();
        });
    }

    logOut() {
        this.socket.emit(outActions.LOG_OUT, this.props.sessionId);
    }

    showInvitationsDialog() {
        this.invitationsDialog.open();
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
                            showInvitationsDialog={this.showInvitationsDialog} />
                    </div>
                    <div className='col-xs-9'>
                        <ChatPanel />
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
        dispatch(inActions.logOut());
    },
});

HomePageContainer = withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(HomePageContainer)
);

export default HomePageContainer;
