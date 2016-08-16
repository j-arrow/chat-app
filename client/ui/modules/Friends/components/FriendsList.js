import React from 'react';
import { List, ListItem } from 'material-ui/List';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import PersonIcon from 'material-ui/svg-icons/social/person';

const FriendsList = () => (
    <List>
        <ListItem
            primaryText='Michael Lee'
            leftIcon={<PersonIcon />}
            rightIcon={<CommunicationChatBubble />} />
        <ListItem
            primaryText='Peter Clemenza'
            leftIcon={<PersonIcon />}
            rightIcon={<CommunicationChatBubble />} />
        <ListItem
            primaryText='Tommy Hangen'
            leftIcon={<PersonIcon />}
            rightIcon={<CommunicationChatBubble />} />
        <ListItem
            primaryText='Jack Woltz'
            leftIcon={<PersonIcon />}
            rightIcon={<CommunicationChatBubble />} />
    </List>
);

export default FriendsList;
