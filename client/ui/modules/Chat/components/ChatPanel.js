import React from 'react';
import { Paper } from 'material-ui';
import ChatHeader from './ChatHeader.js';
import ChatMessageList from './ChatMessageList.js';
import ChatForm from './ChatForm.js';

class ChatPanel extends React.Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            username: '',
        };
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }

    open(friend) {
        this.setState({
            visible: true,
            username: friend.username,
        });
    }

    close() {
        this.setState({
            visible: false,
        });
    }

    render() {
        if (!this.state.visible) {
            return null;
        }

        return (
            <Paper>
                <div className='chat-panel'>
                    <ChatHeader
                        username={this.state.username}
                        closeAction={this.close} />
                    <ChatMessageList />
                    <ChatForm />
                </div>
            </Paper>
        );
    }
};

export default ChatPanel;
