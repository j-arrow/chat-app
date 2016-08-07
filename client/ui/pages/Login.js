import React from 'react';
import { connect } from 'react-redux';
import LoginForm from 'User/components/LoginForm.js';

let Login = ({
    logIn,
}) => (
    <div>
        <h1>Login page</h1>
        <LoginForm />
    </div>
);

export default Login;
