import React from 'react';

// import io from 'socket.io-client';
import * as emitters from '../emitters/todos.js';
const socket = io.connect('/');

class AddTodo extends React.Component {
    constructor() {
        super();
        this.state = {
            inputValue: '',
        };
    };

    inputValueChange(e) {
        this.setState({
            inputValue: e.target.value,
        });
    };

    createTodo() {
        emitters.emitInsert(socket, {
            completed: false,
            name: this.state.inputValue,
        });
        this.setState({
            inputValue: '',
        });
    };

    createTodoEnterPressed(e) {
        if (e.which == 13) {
            this.createTodo();
        }
    };

    render() {
        return (
            <div>
                <input
                    type='text'
                    value={this.state.inputValue}
                    onChange={this.inputValueChange.bind(this)}
                    onKeyPress={this.createTodoEnterPressed.bind(this)} />
                <button
                    onClick={this.createTodo.bind(this)}>
                    Add
                </button>
            </div>
        )
    };
};

export default AddTodo;
