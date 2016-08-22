import React from 'react';
import {
    Paper,
    Divider,
    RaisedButton } from 'material-ui';
import {
    CommunicationVpnKey
    } from 'material-ui/svg-icons';
import Formsy from 'formsy-react';
import { FormsyText } from 'formsy-material-ui/lib';
import { NotificationManager } from 'react-notifications';
import { withRouter, Link } from 'react-router';
import { connect } from 'react-redux';
import * as authActions from '../actions/auth.js';

const styles = {
    paper: {
        width: 700,
        margin: 'auto',
        padding: 30,
    },
    form: {
        textAlign: 'center',
    },
    error: {
        color: 'red',
    },
    registerButton: {
        marginTop: 30,
    },
};

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formValidationError: '',
        };
    }

    render() {
        return (
            <Paper
                style={styles.paper}>
                <div className='row'>
                    <div className='col-xs-7' style={styles.form}>
                        <h2>Register form</h2>
                        <Divider />
                        <Formsy.Form>
                            <FormsyText
                                name='username'
                                hintText='Please enter your username'
                                floatingLabelText='Username'
                                required
                                fullWidth={true} />
                            <FormsyText
                                name='password'
                                type='password'
                                hintText='Please enter your password'
                                floatingLabelText='Password'
                                required
                                fullWidth={true} />
                            <FormsyText
                                name='repeatPassword'
                                type='password'
                                hintText='Please repeat your password'
                                floatingLabelText='Repeat password'
                                required
                                fullWidth={true} />
                            <div>
                                <p
                                    style={styles.error}>
                                    {this.state.formValidationError}
                                </p>
                                <RaisedButton
                                    label='Register'
                                    labelPosition='after'
                                    type='submit'
                                    primary={true}
                                    fullWidth={true}
                                    style={styles.registerButton}
                                    icon={
                                        <CommunicationVpnKey />
                                    } />
                            </div>
                        </Formsy.Form>
                        <hr />
                        Already have an account? <Link to='/login'>Log in!</Link>
                    </div>
                    <div className='col-xs-5'>
                        <br />
                        <br />
                        <br />
                        <br />
                        Username:
                        <ul>
                            <li><strong>must</strong> be 5-15 characters long</li>
                        </ul>
                        Password:
                        <ul>
                            <li><strong>must</strong> be 6-15 characters long</li>
                            <li><strong>must</strong> have no spaces</li>
                            <li><strong>must</strong> have at least 1 digit</li>
                            <li><strong>must</strong> have at least 1 uppercase and lowercase letter</li>
                            <li>can contain <em>!@#$%_</em> characters</li>
                        </ul>
                    </div>
                </div>
            </Paper>
        );
    }
};

RegisterForm.propTypes = {
    redirectToHome: React.PropTypes.func.isRequired,
    redirectToLogin: React.PropTypes.func.isRequired,
    handleRegister: React.PropTypes.func.isRequired,
};

let RegisterFormContainer = ({
    redirectToHome,
    redirectToLogin,
    handleRegister,
}) => (
    <RegisterForm
        redirectToHome={redirectToHome}
        redirectToLogin={redirectToLogin}
        handleRegister={handleRegister} />
);

const mapStateToProps = (state, ownProps) => ({
    redirectToHome: () => {
        ownProps.router.push('/');
    },
    redirectToLogin: () => {
        ownProps.router.push('/login');
    },
});

const mapDispatchToProps = (dispatch) => ({
    handleRegister: (registrationData) => {
        dispatch(authActions.register(registrationData));
    },
});

RegisterFormContainer = withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(RegisterFormContainer)
);

export default RegisterFormContainer;
