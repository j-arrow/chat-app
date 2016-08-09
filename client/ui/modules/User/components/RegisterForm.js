import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router';
import { register } from '../reducers/auth.js';

import * as emitters from '../emitters/auth.js';

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            repeatPassword: '',
        }
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleRepeatPasswordChange = this.handleRepeatPasswordChange.bind(this);
        this.handleUserRegister = this.handleUserRegister.bind(this);
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
            password: e.target.value,
        });
    }

    handleRepeatPasswordChange(e) {
        e.preventDefault();
        // TODO client-side validation
        this.setState({
            repeatPassword: e.target.value,
        });
    }

    handleUserRegister(e) {
        e.preventDefault();

        let register = (registrationData) => {
            this.props.handleRegister(registrationData);
            this.props.redirectToLogin();
        };

        emitters.register({
            ...this.state,
        }, register)
    }

    render() {
        return (
            <div>
                <h2>Register form</h2>

                <form
                    onSubmit={this.handleUserRegister}>
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
                    <input
                        type='password'
                        placeholder='repeat password'
                        defaultValue={this.state.repeatPassword}
                        onChange={this.handleRepeatPasswordChange} />
                    <button
                        type='submit'>
                        Register!
                    </button>
                </form>

                <Link to='/login'>Log in!</Link>
            </div>
        );
    };
};

RegisterForm.propTypes = {
    loggedIn: React.PropTypes.bool.isRequired,
    redirectToHome: React.PropTypes.func.isRequired,
    redirectToLogin: React.PropTypes.func.isRequired,
    handleRegister: React.PropTypes.func.isRequired,
};

let RegisterFormContainer = ({
    loggedIn,
    redirectToHome,
    redirectToLogin,
    handleRegister,
}) => (
    <RegisterForm
        loggedIn={loggedIn}
        redirectToHome={redirectToHome}
        redirectToLogin={redirectToLogin}
        handleRegister={handleRegister} />
);

const mapStateToProps = (state, ownProps) => ({
    loggedIn: state.auth.loggedIn,
    redirectToHome: () => {
        ownProps.router.push('/');
    },
    redirectToLogin: () => {
        ownProps.router.push('/login');
    }
});

const mapDispatchToProps = (dispatch) => ({
    handleRegister: (registrationData) => {
        dispatch(register(registrationData));
    },
});

RegisterFormContainer = withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(RegisterFormContainer)
);

export default RegisterFormContainer;
