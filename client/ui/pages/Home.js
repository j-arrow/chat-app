import React from 'react';

let HomePage = ({
    children,
}) => (
    <div>
        <h1>Home page</h1>
    </div>
);

const mapStateToProps = (state) => ({
    todos: state.todos,
});

export default HomePage;
