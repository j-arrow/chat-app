import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class HomePage extends React.Component {
    componentDidUpdate() {
        if (!this.props.loggedIn) {
            this.props.redirectToLogin();
        }
    }

    render() {
        return (
            <h1>Home page</h1>
        );
    }
}

let HomePageContainer = ({
    loggedIn,
    redirectToLogin,
}) => (
    <HomePage
        loggedIn={loggedIn}
        redirectToLogin={redirectToLogin} />
);

const mapStateToProps = (state, ownProps) => ({
    loggedIn: state.auth.loggedIn,
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
