import React from 'react';
import { FlatButton } from 'material-ui';
import Formsy from 'formsy-react';
import { FormsyText } from 'formsy-material-ui/lib';

class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(data) {
        this.props.onSearch(data.username);
    }

    render() {
        return (
            <Formsy.Form
                onSubmit={this.handleSearch}>
                <div className='row' style={{position:'relative'}}>
                    <div className='col-xs-10'>
                        <FormsyText
                            name="username"
                            hintText='Please enter username of your friend'
                            floatingLabelText="Friend's username"
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
        )
    }
}

export default SearchForm;
