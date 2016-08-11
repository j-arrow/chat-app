import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router';
import * as inActions from '../reducers/auth.js';
import * as outActions from '$shared/User/auth-out.js';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleUserLogin = this.handleUserLogin.bind(this);

        this.prepareSocket();
    }

    prepareSocket() {
        this.socket = io.connect(outActions.SOCKET_NAMESPACE);
        this.socket.on(inActions.LOG_IN_SUCCESS, username => {
            this.props.handleLogIn(username);
            this.props.redirectToHome();
        });
        this.socket.on(inActions.LOG_IN_ERROR, errorMessage => {
            console.log(errorMessage);
        });
    }

    componentDidMount() {
        if (this.props.loggedIn) {
            this.props.redirectToHome();
        }
    }

    handleUsernameChange(e) {
        e.preventDefault();
        // TODO client-side validation
        this.setState({
            username: e.target.value,
        });
    }

    handlePasswordChange(e) {
        e.preventDefault();
        // TODO client-side validation
        this.setState({
            password: e.target.value
        });
    }

    handleUserLogin(e) {
        e.preventDefault();

        this.socket.emit(outActions.LOG_IN, {
            ...this.state,
        });
    }

    render() {
        return (
            <div>
                <h2>Login form</h2>

                <RaisedButton label="Hey hi hello!" />
                <form
                    onSubmit={this.handleUserLogin}>
                    <input
                        type='text'
                        placeholder='username'
                        defaultValue={this.state.username}
                        onChange={this.handleUsernameChange} />
                    <input
                        type='password'
                        placeholder='password'
                        defaultValue={this.state.password}
                        onChange={this.handlePasswordChange} />
                    <button
                        type='submit'>
                        Log in!
                    </button>
                </form>

                <Link to='/register'>Register!</Link>
            </div>
        );
    };
};

LoginForm.propTypes = {
    loggedIn: React.PropTypes.bool.isRequired,
    redirectToHome: React.PropTypes.func.isRequired,
    handleLogIn: React.PropTypes.func.isRequired,
};

let LoginFormContainer = ({
    loggedIn,
    redirectToHome,
    handleLogIn,
}) => (
    <LoginForm
        loggedIn={loggedIn}
        redirectToHome={redirectToHome}
        handleLogIn={handleLogIn} />
)

const mapStateToProps = (state, ownProps) => ({
    loggedIn: state.auth.loggedIn,
    redirectToHome: () => {
        ownProps.router.push('/')
    },
});

const mapDispatchToProps = (dispatch) => ({
    handleLogIn: (username) => {
        dispatch(inActions.logIn(username));
    },
});

LoginFormContainer = withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(LoginFormContainer)
);

export default LoginFormContainer;
