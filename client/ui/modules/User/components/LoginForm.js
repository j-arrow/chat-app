import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router';
import { logIn } from '../reducers/auth.js';

import * as emitters from '../emitters/auth.js';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    }

    componentDidUpdate() {
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

        let logIn = (username) => {
            this.props.handleLogIn(username);
            this.props.redirectToHome();
        };

        emitters.logIn({
            ...this.state,
        }, logIn);
    }

    render() {
        return (
            <div>
                <h2>Login form</h2>

                <RaisedButton label="Hey hi hello!" />
                <form
                    onSubmit={this.handleUserLogin.bind(this)}>
                    <input
                        type='text'
                        placeholder='username'
                        defaultValue={this.state.username}
                        onChange={this.handleUsernameChange.bind(this)} />
                    <input
                        type='password'
                        placeholder='password'
                        defaultValue={this.state.password}
                        onChange={this.handlePasswordChange.bind(this)} />
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
        dispatch(logIn(username));
    },
});

LoginFormContainer = withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(LoginFormContainer)
);

export default LoginFormContainer;
