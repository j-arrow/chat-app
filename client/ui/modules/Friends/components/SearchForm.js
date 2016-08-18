import React from 'react';
import { FlatButton } from 'material-ui';
import Formsy from 'formsy-react';
import { FormsyText } from 'formsy-material-ui/lib';

class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
        this.clear = this.clear.bind(this);
    }

    handleSearch(data) {
        this.props.onSearch(data.username);
    }

    clear() {
        this.form.reset();
    }

    render() {
        return (
            <Formsy.Form
                ref={form => this.form = form}
                onSubmit={this.handleSearch}>
                <div className='row' style={{position:'relative'}}>
                    <div className='col-xs-8'>
                        <FormsyText
                            name="username"
                            hintText='Please enter username of your friend'
                            floatingLabelText="Friend's username"
                            fullWidth={true} />
                    </div>
                    <div className='col-xs-4' style={{position:'absolute',right:0,bottom:0,textAlign:'right'}}>
                        <FlatButton
                            label='Search'
                            type='submit'
                            primary={true} />
                        <FlatButton
                            label='Clear'
                            secondary={true}
                            onClick={this.clear} />
                    </div>
                </div>
            </Formsy.Form>
        )
    }
}

export default SearchForm;
