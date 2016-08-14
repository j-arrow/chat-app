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
import * as inActions from '../reducers/auth.js';
import * as outActions from '$shared/User/auth-out.js';

const styles = {
    paper: {
        width: 400,
        margin: 'auto',
        padding: 30,
    },
    error: {
        color: 'red',
    },
    registerButton: {
        marginTop: 30,
    },
    passwordInfo: {
        fontSize: '0.8em',
    },
};

Formsy.addValidationRule('isPassword', (values, value) => {
    // Password must be 6-15 characters - {6,15} Must have no spaces,
    // at least 1 digit (?=.*[\d]), at least 1 uppercase letter
    // (?=.*[A-Z]) and at least one lowercase letter (?=.*[a-z]).
    // Allows specifying special characters - !@#$%_
    return /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])[\w\d!@#$%_]{6,15}$/.test(value);
});
Formsy.addValidationRule('matchMainPassword', (values, value) => {
    return value === values.password;
});

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formValidationError: '',
        };

        this.submitForm = this.submitForm.bind(this);
        this.prepareSocket = this.prepareSocket.bind(this);
        this.prepareSocket();
    }

    componentDidMount() {
        if (this.props.loggedIn) {
            this.props.redirectToHome();
        }
    }

    prepareSocket() {
        this.socket = io.connect(outActions.SOCKET_NAMESPACE);
        this.socket.on(inActions.REGISTER_SUCCESS, registrationData => {
            this.setState({
                formValidationError: '',
            });
            this.props.handleRegister(registrationData);
            NotificationManager.success(
                'You registered successfully, please log in!',
                'Registration successful',
                3000
            );
            this.props.redirectToLogin();
        });
        this.socket.on(inActions.REGISTER_ERROR, errorMessage => {
            this.setState({
                formValidationError: errorMessage,
            });
        });
    }

    submitForm(data) {
        this.socket.emit(outActions.REGISTER, data);
    }

    render() {
        return (
            <Paper
                style={styles.paper}>
                <h2>Register form</h2>
                <Divider />
                <Formsy.Form
                    onValidSubmit={this.submitForm}>
                    <FormsyText
                        name='username'
                        hintText='Please enter your username'
                        floatingLabelText='Username'
                        validations={{
                            minLength:3,
                            maxLength: 15
                        }}
                        validationError='Username must be 3-15 characters long'
                        required
                        fullWidth={true} />
                    <FormsyText
                        name='password'
                        type='password'
                        hintText='Please enter your password'
                        floatingLabelText='Password'
                        validations='isPassword'
                        validationError='Password requirements not met'
                        required
                        fullWidth={true} />
                    <FormsyText
                        name='repeatPassword'
                        type='password'
                        hintText='Please repeat your password'
                        floatingLabelText='Repeat password'
                        validations='matchMainPassword'
                        validationError='Both passwords must match'
                        required
                        fullWidth={true} />
                    <div>
                        <p
                            style={styles.error}>
                            {this.state.formValidationError}
                        </p>
                        <span
                            style={styles.passwordInfo}>
                            Password:
                            <ul>
                                <li><strong>must</strong> be 6-15 characters long,</li>
                                <li><strong>must</strong> have no spaces,</li>
                                <li><strong>must</strong> have at least 1 digit,</li>
                                <li><strong>must</strong> have at least 1 uppercase and lowercase letter,</li>
                                <li>can contain <em>!@#$%_</em> characters</li>
                            </ul>
                        </span>
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
            </Paper>
        );
    }
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
    },
});

const mapDispatchToProps = (dispatch) => ({
    handleRegister: (registrationData) => {
        dispatch(inActions.register(registrationData));
    },
});

RegisterFormContainer = withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(RegisterFormContainer)
);

export default RegisterFormContainer;
