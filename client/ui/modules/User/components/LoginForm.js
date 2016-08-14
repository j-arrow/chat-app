import React from 'react';
import {
    Paper,
    Divider,
    RaisedButton } from 'material-ui';
import {
    ActionInput
    } from 'material-ui/svg-icons';
import Formsy from 'formsy-react';
import { FormsyText } from 'formsy-material-ui/lib';
import { NotificationManager } from 'react-notifications';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router';
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
    loginButton: {
        marginTop: 30,
    },
};

class LoginForm extends React.Component {
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
        this.socket.on(inActions.LOG_IN_SUCCESS, data => {
            this.setState({
                formValidationError: '',
            });
            this.props.handleLogIn(data);
            NotificationManager.success(
                'You logged in!',
                'Login successful',
                3000
            );
            this.props.redirectToHome();
        });
        this.socket.on(inActions.LOG_IN_ERROR, errorMessage => {
            this.setState({
                formValidationError: errorMessage,
            });
        });
    }

    submitForm(data) {
        this.socket.emit(outActions.LOG_IN, data);
    }

    render() {
        return (
            <Paper
                style={styles.paper}>
                <h2>Login form</h2>
                <Divider />
                <Formsy.Form
                    onValidSubmit={this.submitForm}>
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
                    <div>
                        <p
                            style={styles.error}>
                            {this.state.formValidationError}
                        </p>
                        <RaisedButton
                            label='Login'
                            labelPosition='after'
                            type='submit'
                            primary={true}
                            style={styles.loginButton}
                            fullWidth={true}
                            icon={
                                <ActionInput />
                            } />
                    </div>
                </Formsy.Form>
                <hr />
                You don't have an account? <Link to='/register'>Register!</Link>
            </Paper>
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
);

const mapStateToProps = (state, ownProps) => ({
    loggedIn: state.auth.loggedIn,
    redirectToHome: () => {
        ownProps.router.push('/')
    },
});

const mapDispatchToProps = (dispatch) => ({
    handleLogIn: (username) => {
        dispatch(inActions.logIn(username));
    }
});

LoginFormContainer = withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(LoginFormContainer)
);

export default LoginFormContainer;
