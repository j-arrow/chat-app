import React from 'react';
import { Paper } from 'material-ui';
import ChatHeader from './ChatHeader.js';
import ChatMessageList from './ChatMessageList.js';
import ChatForm from './ChatForm.js';

const ChatPanel = () => (
    <Paper>
        <div className='chat-panel'>
            <ChatHeader />
            <ChatMessageList />
            <ChatForm />
        </div>
    </Paper>
);

export default ChatPanel;
