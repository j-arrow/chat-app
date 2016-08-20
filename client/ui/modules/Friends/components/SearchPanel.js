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
import { connect } from 'react-redux';
import userConstants from '$shared/User/user.js';
import friendsConstants from '$shared/Friends/friends.js';

class SearchPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
        };

        this.searchUsers = this.searchUsers.bind(this);
        this.sendInvitation = this.sendInvitation.bind(this);
        this.prepareUserSocket();
        this.prepareFriendsSocket();
    }

    prepareUserSocket() {
        this.userSocket = io.connect(userConstants.SOCKET.NAMESPACE);
        this.userSocket.on(userConstants.SERVER.SEARCH_SUCCESS, users => {
            this.setState({
                results: users,
            });
        });
        this.userSocket.on(userConstants.SERVER.SEARCH_ERROR, errorMessage => {
            // TODO
        });
    }

    prepareFriendsSocket() {
        this.friendsSocket = io.connect(friendsConstants.SOCKET.NAMESPACE);
        this.friendsSocket.on(friendsConstants.SERVER.INVITE_SUCCESS, () => {
            console.log('CLIENT: invitation was sent indeed');
        });
        this.friendsSocket.on(friendsConstants.SERVER.INVITE_ERROR, errorMessage => {
            // TODO
        });
    }

    searchUsers(username) {
        this.userSocket.emit(userConstants.CLIENT.SEARCH, { username });
    }

    sendInvitation(userId) {
        let { sessionId } = this.props;

        this.friendsSocket.emit(friendsConstants.CLIENT.INVITE, {
            userId,
            sessionId,
        });
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
                                username={user.username}
                                sendInvitation={() => {
                                    this.sendInvitation(user.id);
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
