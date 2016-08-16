import React from 'react';
import AppBar from 'material-ui/AppBar';
import { FlatButton, FloatingActionButton, Badge } from 'material-ui';
import PendingInvitationsIcon from 'material-ui/svg-icons/social/person-add';

const Header = ({
    username,
    handleLogOut,
    showInvitationsDialog,
}) => (
    <AppBar
        title={'Talk2Me: ' + username + '!'}
        iconElementLeft={<p></p>}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
            <FlatButton style={{height:'100%'}}
                onClick={showInvitationsDialog}>
                <Badge
                    badgeContent={5}
                    primary={true}
                    style={{paddingBottom:0}}
                    badgeStyle={{top:10,right:10,width:'18px',height:'18px'}}>
                    <PendingInvitationsIcon
                        style={{color:'white'}} />
                </Badge>
            </FlatButton>
            <FlatButton
                label='Log out'
                onClick={handleLogOut}
                style={{color:'white'}} />
        </div>
    </AppBar>
);

Header.propTypes = {
    username: React.PropTypes.string,
    handleLogOut: React.PropTypes.func.isRequired,
    showInvitationsDialog: React.PropTypes.func.isRequired,
};

export default Header;
