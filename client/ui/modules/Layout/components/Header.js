import React from 'react';
import { connect } from 'react-redux';
import { logOut } from 'User/reducers/auth.js';

let Header = ({
    username,
    handleLogOut,
}) => (
    <div>
        <span>Hello, {username}!</span>
        <button
            onClick={handleLogOut}>
            Log out!
        </button>
    </div>
);

const mapDispatchToProps = (dispatch) => ({
    handleLogOut: () => {
        dispatch(logOut());
    }
});

Header = connect(
    (state) => ({}),
    mapDispatchToProps
)(Header);

export default Header;
