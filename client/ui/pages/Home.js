import React from 'react';
import { connect } from 'react-redux';
import TodoList from 'Todo/components/TodoList.js';

let HomePage = ({
    children,
    todos,
}) => (
    <div>
        <h1>Home page</h1>
        <TodoList
            todos={todos} />
    </div>
);

const mapStateToProps = (state) => ({
    todos: state.todos,
});

HomePage = connect(
    mapStateToProps
)(HomePage);

export default HomePage;
