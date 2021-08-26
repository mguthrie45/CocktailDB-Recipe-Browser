import React from 'react';
import './style/SearchButton.css';

class SearchButton extends React.Component {
    onSearch = (evt) => {
        this.props.onSearch();
    }

    render() {
        return (
            <div className='item' id='search-button' onClick={this.onSearch}>
                <span id='apply-text'>Apply</span>
            </div>
        );
    }
}

export default SearchButton;