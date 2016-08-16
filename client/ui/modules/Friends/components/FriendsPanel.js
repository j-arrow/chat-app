import React from 'react';
import { Paper, RaisedButton, Divider, FlatButton } from 'material-ui';

import FriendsList from 'Friends/components/FriendsList.js';
import FriendsDialog from 'Friends/components/SearchDialog.js';

const FriendsPanel = ({
    showInvitationsDialog,
}) => (
    <Paper>
        <div style={{height:110,display:'flex',alignItems:'center',flexDirection:'column',justifyContent:'center'}}>
            <h1 style={{marginBottom:0,marginTop:0}}>Friends</h1>
            <div style={{flexDirection:'row'}}>
                <div style={{display:'inline-block'}}>
                    <FriendsDialog />
                </div>
                <div style={{display:'inline-block'}}>
                    <FlatButton
                        label='Invitations'
                        primary={true}
                        onClick={showInvitationsDialog} />
                </div>
            </div>
        </div>
        <Divider />
        <FriendsList />
    </Paper>
);

FriendsPanel.propTypes = {
    showInvitationsDialog: React.PropTypes.func.isRequired,
};

export default FriendsPanel;
