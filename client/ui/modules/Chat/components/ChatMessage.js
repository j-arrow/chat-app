import React from 'react';
import { Paper, Avatar } from 'material-ui';
import PersonIcon from 'material-ui/svg-icons/social/person';

const ChatMessage = ({
    type
}) => {
    const classNameToApply = type === 'in' ? 'chat-message incoming' : 'chat-message outgoing';

    return (
        <Paper className={classNameToApply}>
            <div className='header'>
                <Avatar icon={<PersonIcon />} className='avatar' />
                <h3 className='name'>Me</h3>
            </div>
            <div className='message'>
                <div className='content'>
                    Sed ut pharetra nibh. Ut at mauris quis orci convallis semper et in orci.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla luctus
                    turpis sed ante laoreet, in viverra tortor imperdiet. Lorem ipsum dolor
                    sit amet, consectetur adipiscing elit. Nunc non condimentum eros. Praesent
                    varius fermentum maximus. Sed ut pharetra nibh. Ut at mauris quis orci
                    convallis semper et in orci.
                </div>
                <div className='clearboth'></div>
            </div>
        </Paper>
    );
};

export default ChatMessage;
