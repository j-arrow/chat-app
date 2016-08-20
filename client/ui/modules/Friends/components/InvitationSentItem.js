import React from 'react';
import { FlatButton } from 'material-ui';
import {
    TableRow,
    TableRowColumn } from 'material-ui/Table';

const InvitationSentItem = ({
    username,
}) => (
    <TableRow>
      <TableRowColumn>
          {username}
      </TableRowColumn>
      <TableRowColumn>
          <FlatButton
              label='Accept'
              primary={true} />
          <FlatButton
              label='Reject'
              secondary={true} />
      </TableRowColumn>
    </TableRow>
);

export default InvitationSentItem;
