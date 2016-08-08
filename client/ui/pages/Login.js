import React from 'react';
import { connect } from 'react-redux';
import LoginFormContainer from 'User/components/LoginForm.js';

let Login = ({
    logIn,
}) => (
    <div>
        <h1>Login page</h1>
        <LoginFormContainer />
    </div>
);

export default Login;
