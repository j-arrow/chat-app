import React from 'react';

import * as emitters from '../emitters/auth.js';
var socket = io.connect('/');

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
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

        let { logIn } = this.props;
        emitters.logIn(
            socket,
            this.state
        );
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



export default LoginForm;
