import React from 'react';
import { FlatButton, Dialog } from 'material-ui';
import InvitationsPanelContainer from './InvitationsPanel.js';

class InvitationsDialog extends React.Component {
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
            <Dialog
                modal={false}
                title='Friends invitations'
                actions={actions}
                open={this.state.open}
                onRequestClose={this.close}>

                    <InvitationsPanelContainer />

            </Dialog>
        );
    }
};

export default InvitationsDialog;
