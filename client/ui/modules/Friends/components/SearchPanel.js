import React from 'react';
import { Divider } from 'material-ui';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow } from 'material-ui/Table';
import SearchForm from './SearchForm.js';
import UserTableRow from './UserTableRow.js';
import userConstants from '$shared/User/user.js';

class SearchPanel extends React.Component {
    constructor() {
        super();
        this.state = {
            results: [],
        };

        this.searchUsers = this.searchUsers.bind(this);
        this.prepareSocket = this.prepareSocket.bind(this);
        this.prepareSocket();
    }

    prepareSocket() {
        this.socket = io.connect(userConstants.SOCKET.NAMESPACE);
        this.socket.on(userConstants.SERVER.SEARCH_SUCCESS, users => {
            this.setState({
                results: users,
            });
        });
        this.socket.on(userConstants.SERVER.SEARCH_ERROR, errorMessage => {
            // TODO
        });
    }

    searchUsers(username) {
        this.socket.emit(userConstants.CLIENT.SEARCH, username);
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
                            <UserTableRow
                                key={i}
                                username={user.username} />
                        )}

                    </TableBody>
                </Table>
            </div>
        );
    }
}

export default SearchPanel;
