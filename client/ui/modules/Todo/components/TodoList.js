import React from 'react';
import Todo from './Todo.js';
import AddTodo from './AddTodo.js';

const TodoList = ({
    todos,
}) => (
    <div>
        <h2>Todo list</h2>
        <AddTodo />
        <ul>
            {todos.map(todo =>
                <Todo
                    key={todo.id}
                    todo={todo} />
            )}
        </ul>
    </div>
)

export default TodoList;
