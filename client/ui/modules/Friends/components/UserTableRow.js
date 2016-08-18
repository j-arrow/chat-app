import React from 'react';
import { FlatButton } from 'material-ui';
import {
    TableRow,
    TableRowColumn } from 'material-ui/Table';

const UserTableRow = ({
    username,
}) => (
    <TableRow>
        <TableRowColumn>
            {username}
        </TableRowColumn>
        <TableRowColumn>
            <FlatButton
                label='Invite' />
        </TableRowColumn>
    </TableRow>
);

export default UserTableRow;
