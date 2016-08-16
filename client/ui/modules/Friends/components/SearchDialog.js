import React from 'react';
import { FlatButton, Dialog } from 'material-ui';
import SearchPanel from './SearchPanel.js';

class FriendsDialog extends React.Component {
    constructor() {
        super();
        this.state = {
            open: false,
        };
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }
    open() {
        this.setState({
            open: true,
        });
    }
    close() {
        this.setState({
            open: false,
        });
    }

    render() {
        const actions = [
            <FlatButton
                label='Close!'
                onClick={this.close} />
        ];

        return (
            <div>
                <FlatButton
                    label='Search'
                    primary={true}
                    onClick={this.open} />

                <Dialog
                    modal={false}
                    title='Search your friends'
                    actions={actions}
                    open={this.state.open}
                    onRequestClose={this.close}>

                        <SearchPanel />

                </Dialog>
            </div>
        );
    }
};

export default FriendsDialog;
