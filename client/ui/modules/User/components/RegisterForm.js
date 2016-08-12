import React from 'react';
import {
    Paper,
    Divider,
    RaisedButton } from 'material-ui';
import {
    CommunicationVpnKey
    } from 'material-ui/svg-icons';
import Formsy from 'formsy-react';
import {
    FormsyText } from 'formsy-material-ui/lib';
import { withRouter, Link } from 'react-router';
import { connect } from 'react-redux';
import * as inActions from '../reducers/auth.js';
import * as outActions from '$shared/User/auth-out.js';

const styles = {
    paper: {
        width: 400,
        margin: 'auto',
        padding: 20,
    },
    error: {
        color: 'red',
    },
    field: {
        width: '100%',
    },
    registerButton: {
        marginTop: 30,
        width: '100%',
    },
};

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
                        required
                        style={styles.field} />
                    <FormsyText
                        name='password'
                        type='password'
                        hintText='Please enter your password'
                        floatingLabelText='Password'
                        required
                        style={styles.field} />
                    <FormsyText
                        name='repeatPassword'
                        type='password'
                        hintText='Please repeat your password'
                        floatingLabelText='Repeat password'
                        required
                        style={styles.field} />
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
