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
import * as authActions from '../actions/auth.js';

const styles = {
    paper: {
        width: 400,
        margin: 'auto',
        padding: 30,
        textAlign: 'center',
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
    }

    componentDidMount() {
        if (this.props.loggedIn) {
            this.props.redirectToHome();
        }
    }

    render() {
        return (
            <Paper
                style={styles.paper}>
                <h2>Login form</h2>
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
    handleLogIn: (data) => {
        dispatch(authActions.logIn(data));
    }
});

LoginFormContainer = withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(LoginFormContainer)
);

export default LoginFormContainer;
