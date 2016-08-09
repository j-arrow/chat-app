import React from 'react';
import Header from 'Layout/components/Header.js';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class HomePage extends React.Component {
    componentDidUpdate() {
        if (!this.props.loggedIn) {
            this.props.redirectToLogin();
        }
    }

    render() {
        const { username } = this.props;

        return (
            <div>
                <Header
                    username={username} />
                <h1>Home page</h1>
            </div>
        );
    }
}

HomePage.propTypes = {
    loggedIn: React.PropTypes.bool.isRequired,
    username: React.PropTypes.string,
    redirectToLogin: React.PropTypes.func.isRequired,
};

let HomePageContainer = ({
    loggedIn,
    username,
    redirectToLogin,
}) => (
    <HomePage
        loggedIn={loggedIn}
        username={username}
        redirectToLogin={redirectToLogin} />
);

const mapStateToProps = (state, ownProps) => ({
    loggedIn: state.auth.loggedIn,
    username: state.auth.username,
    redirectToLogin: () => {
        ownProps.router.push('/login')
    },
});

HomePageContainer = withRouter(
    connect(
        mapStateToProps
    )(HomePageContainer)
);

export default HomePageContainer;
