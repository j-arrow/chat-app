import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { logIn } from '../reducers/auth.js';

import * as emitters from '../emitters/auth.js';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'root',
            password: 'root123',
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

        let logIn = (user) => {
            this.props.handleLogIn(user);
            this.props.redirectToHome();
        }

        emitters.logIn({
                ...this.state,
            },
            handleLogIn,
            errorMessage => {
                console.log(errorMessage);
            });
    }

    render() {
        return (
            <div>
                <h2>Login form</h2>

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
            </div>
        );
    }
}

let LoginFormContainer = ({
    loggedIn,
    redirectToHome,
    dispatchLogIn,
}) => (
    <LoginForm
        loggedIn={loggedIn}
        redirectToHome={redirectToHome}
        handleLogIn={dispatchLogIn} />
)

const mapStateToProps = (state) => ({
    loggedIn: state.auth.loggedIn,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    redirectToHome: () => {
        ownProps.router.push('/')
    },
    dispatchLogIn: (user) => {
        dispatch(logIn(user));
    },
});

LoginFormContainer = withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(LoginFormContainer)
);

export default LoginFormContainer;
