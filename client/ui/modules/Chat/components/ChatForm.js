import React from 'react';
import { Paper, RaisedButton } from 'material-ui';
import Formsy from 'formsy-react';
import { FormsyText } from 'formsy-material-ui/lib';

const ChatForm = () => (
    <Paper className='chat-form'>
        <Formsy.Form>
            <div className='row wrapper'>
                <div className='col-xs-8 col-md-10 col-xl-11'>
                    <FormsyText
                        name='message'
                        hintText='Please enter your message'
                        floatingLabelText='Message'
                        required
                        multiLine={true}
                        rowsMax={4}
                        fullWidth={true} />
                </div>
                <div className='col-xs-4 col-md-2 col-xl-1 submit-btn-wrapper'>
                    <RaisedButton
                        label='Submit'
                        primary={true} />
                </div>
            </div>
        </Formsy.Form>
    </Paper>
);

export default ChatForm;
