import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router';

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            repeatPassword: '',
        }
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

        // TODO emit register event
    }

    render() {
        return (
            <div>
                <h2>Register form</h2>

                <form
                    onSubmit={this.handleUserRegister.bind(this)}>
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
                    <input
                        type='password'
                        placeholder='repeat password'
                        defaultValue={this.state.repeatPassword}
                        onChange={this.handleRepeatPasswordChange.bind(this)} />
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

let RegisterFormContainer = ({
    loggedIn,
    redirectToHome,
}) => (
    <RegisterForm
        loggedIn={loggedIn}
        redirectToHome={redirectToHome} />
);

const mapStateToProps = (state, ownProps) => ({
    loggedIn: state.auth.loggedIn,
    redirectToHome: () => {
        ownProps.router.push('/');
    }
});

const mapDispatchToProps = (dispatch) => ({

});

RegisterFormContainer = withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(RegisterFormContainer)
);

export default RegisterFormContainer;
