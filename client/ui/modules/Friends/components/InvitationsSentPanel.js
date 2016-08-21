import React from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow } from 'material-ui/Table';
import InvitationSentItem from './InvitationSentItem.js';

class InvitationsSentPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { invitations } = this.props;

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

                    {invitations.map((invitation, i) =>
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
