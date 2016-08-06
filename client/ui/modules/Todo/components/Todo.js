import React from 'react';

// import io from 'socket.io-client';
import * as emitters from '../emitters/todos.js';
const socket = io.connect('/');

class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            newName: '',
        };
    }

    deleteTodo() {
        emitters.emitDelete(socket, this.props.todo);
    };

    swapMode() {
        this.setState({
            editMode: !this.state.editMode,
        });
    };

    changeNewName(e) {
        this.setState({
            newName: e.target.value,
        });
    };

    editTodo() {
        let updated = {
            ...this.props.todo,
            name: this.state.newName,
        };
        emitters.emitUpdate(socket, updated);
        this.setState({
            editMode: false,
        });
    };

    editTodoEnterPressed(e) {
        if (e.which == 13) {
            this.editTodo();
        }
    }

    changeCompleted(e) {
        let updated = {
            ...this.props.todo,
            completed: e.target.checked,
        };
        emitters.emitUpdate(socket, updated);
    };

    render() {
        let { editMode } = this.state;
        let { name, completed } = this.props.todo;

        return (
            <li>
                <button
                    onClick={this.deleteTodo.bind(this)}>
                    x
                </button>

                <div
                    style={{display:'inline-block'}}>
                    <input
                        type='checkbox'
                        checked={completed}
                        onChange={this.changeCompleted.bind(this)} />

                    { editMode ?
                        <div style={{display:'inline-block'}}>
                            <input
                                type='text'
                                defaultValue={name}
                                onChange={this.changeNewName.bind(this)}
                                onKeyPress={this.editTodoEnterPressed.bind(this)} />
                            <button
                                onClick={this.editTodo.bind(this)}>
                                Save
                            </button>
                        </div>
                    :
                        name }

                { editMode ?
                    <button
                        onClick={this.swapMode.bind(this)}>
                        Cancel
                    </button>
                    :
                    <button
                        onClick={this.swapMode.bind(this)}>
                        Edit
                    </button> }
                </div>
            </li>
        );
    };
};

export default Todo;
