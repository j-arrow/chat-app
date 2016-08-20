import React from 'react';
import { FlatButton } from 'material-ui';
import {
    TableRow,
    TableRowColumn } from 'material-ui/Table';

const UserTableRow = ({
    username,
    sendInvitation
}) => (
    <TableRow>
        <TableRowColumn>
            {username}
        </TableRowColumn>
        <TableRowColumn>
            <FlatButton
                label='Invite'
                onClick={sendInvitation} />
        </TableRowColumn>
    </TableRow>
);

export default UserTableRow;
