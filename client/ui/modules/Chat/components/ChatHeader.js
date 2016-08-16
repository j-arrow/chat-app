import React from 'react';
import { IconButton } from 'material-ui';
import CloseIcon from 'material-ui/svg-icons/content/clear';

const ChatHeader = ({
    username,
    closeAction,
}) => (
    <div className='chat-header'>
        <p>{username}</p>
        <IconButton
            className='close-btn'
            onClick={closeAction}>
            <CloseIcon />
        </IconButton>
        <div className='clearboth'></div>
    </div>
);

export default ChatHeader;
