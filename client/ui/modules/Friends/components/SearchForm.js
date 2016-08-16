import React from 'react';
import { FlatButton } from 'material-ui';
import Formsy from 'formsy-react';
import { FormsyText } from 'formsy-material-ui/lib';

const SearchForm = () => (
    <Formsy.Form>
        <div className='row' style={{position:'relative'}}>
            <div className='col-xs-10'>
                <FormsyText
                    name="Friend's username"
                    hintText='Please enter username of your friend'
                    floatingLabelText='Username'
                    fullWidth={true} />
            </div>
            <div className='col-xs-2' style={{position:'absolute',right:0,bottom:0}}>
                <FlatButton
                    label='Search'
                    type='submit'
                    primary={true} />
            </div>
        </div>
    </Formsy.Form>
);

export default SearchForm;
