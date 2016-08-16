import React from 'react';
import { ListItem } from 'material-ui/List';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import PersonIcon from 'material-ui/svg-icons/social/person';

const FriendItemList = ({
    username,
    onFriendClick,
}) => (
    <ListItem
        primaryText={username}
        leftIcon={<PersonIcon />}
        rightIcon={<CommunicationChatBubble />}
        onClick={() => {
            onFriendClick({
                username,
            })
        }} />
);

export default FriendItemList;
