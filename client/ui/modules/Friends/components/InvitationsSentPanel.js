import React from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow } from 'material-ui/Table';
import InvitationSentItem from './InvitationSentItem.js';

const tempInvitationsSent = [
    {
        username: 'Tommy Johns',
    }, {
        username: 'Mike Tomphson',
    }, {
        username: 'Mark Philips',
    }
];

class InvitationsSentPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Table>
                <TableHeader
                    displaySelectAll={false}
                    adjustForCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn>Name</TableHeaderColumn>
                        <TableHeaderColumn>Cancel</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody
                    displayRowCheckbox={false}>

                    {tempInvitationsSent.map((invitation, i) =>
                        <InvitationSentItem
                            key={i}
                            username={invitation.username} />
                    )}

                </TableBody>
            </Table>
        );
    }
}

export default InvitationsSentPanel;
