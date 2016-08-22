import React from 'react';
import { Divider } from 'material-ui';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow } from 'material-ui/Table';
import SearchForm from './SearchForm.js';
import SearchUserItem from './SearchUserItem.js';
import { connect } from 'react-redux';

class SearchPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
        };
    }

    render() {
        let { results } = this.state;

        return (
            <div>
                <SearchForm
                    onSearch={this.searchUsers} />
                <hr />
                <Table>
                    <TableHeader
                        displaySelectAll={false}
                        adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>Name</TableHeaderColumn>
                            <TableHeaderColumn>Invite</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}>

                        {results.map((user, i) =>
                            <SearchUserItem
                                key={i}
                                username={user.username}
                                sendInvitation={() => {
                                    // TODO
                                }} />
                        )}

                    </TableBody>
                </Table>
            </div>
        );
    }
}

let SearchPanelContainer = ({
    sessionId,
}) => (
    <SearchPanel
        sessionId={sessionId} />
);

const mapStateToProps = (state) => ({
    sessionId: state.auth.sessionId,
});

SearchPanelContainer = connect(
    mapStateToProps
)(SearchPanelContainer);

export default SearchPanelContainer;
