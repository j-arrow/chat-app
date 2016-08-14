import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as inActions from 'User/reducers/auth.js';
import * as outActions from '$shared/User/auth-out.js';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

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

    render() {
        const { username } = this.props;

        return (
            <div>
                <Header
                    username={username} />
                <h1>Home page</h1>
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
