import React from 'react';
import { Paper } from 'material-ui';
import ChatMessage from './ChatMessage.js';

const ChatMessageList = () => (
    <div className='messages'>
        <ChatMessage type='in' />
        <ChatMessage type='out' />
        <ChatMessage type='in' />
        <ChatMessage type='in' />
        <ChatMessage type='out' />
        <ChatMessage type='out' />
        <ChatMessage type='out' />
        <ChatMessage type='out' />
        <ChatMessage type='in' />
        <ChatMessage type='in' />
        <ChatMessage type='in' />
        <ChatMessage type='in' />
    </div>
);

export default ChatMessageList;
