import React from 'react';
import { connect } from 'react-hz';

const Home = ({
    messages,
    addTodo,
}) => (
    <h1>
        <button
            onClick={addTodo}>
            add todo
        </button>
        {messages.map((message,i) => 
            <h3 key={i}>
                {message.content}
            </h3>
        )}
    </h1>
);

let HomeContainer = ({
    messages,
    addTodo,
}) => (
    <Home
        messages={messages}
        addTodo={addTodo} />
);

HomeContainer = connect(HomeContainer, {
    subscriptions: {
        messages: (hz) => hz('messages'),
    },
    mutations: {
        addTodo: (hz) => () => hz('messages').store({
            content: 'test message 1',
        }),
    }
});

export default HomeContainer;