import React from 'react';
import { List } from 'material-ui/List';
import FriendListItem from './FriendListItem.js';

const FriendsList = ({
    onFriendClick,
}) => (
    <List>
        <FriendListItem
            username='Michael Lee'
            onFriendClick={onFriendClick} />
        <FriendListItem
            username='Peter Clemenza'
            onFriendClick={onFriendClick} />
        <FriendListItem
            username='Tommy Hangen'
            onFriendClick={onFriendClick} />
        <FriendListItem
            username='Jack Woltz'
            onFriendClick={onFriendClick} />
    </List>
);

export default FriendsList;
