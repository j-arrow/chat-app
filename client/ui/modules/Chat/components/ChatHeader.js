import React from 'react';
import { IconButton } from 'material-ui';
import CloseIcon from 'material-ui/svg-icons/content/clear';

const ChatHeader = () => (
    <div className='chat-header'>
        <p>Michael Lee</p>
        <IconButton className='close-btn'>
            <CloseIcon />
        </IconButton>
        <div className='clearboth'></div>
    </div>
);

export default ChatHeader;
