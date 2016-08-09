import React from 'react';
import { connect } from 'react-redux';
import { logOut } from 'User/reducers/auth.js';

let Header = ({
    logOut,
}) => (
    <button
        onClick={logOut}
        >
        Log out!
    </button>
);

const mapDispatchToProps = (dispatch) => ({
    logOut: () => {
        dispatch(logOut());
    }
});

Header = connect(
    (state) => ({}),
    mapDispatchToProps
)(Header);

export default Header;
