import React from 'react';
import './style/SearchButton.css';

class SearchButton extends React.Component {
    onSearch = (evt) => {
        console.log('searched');
        this.props.onSearch();
    }

    render() {
        return (
            <div className='item' id='search-button' onClick={this.onSearch}>
                Apply
            </div>
        );
    }
}

export default SearchButton;