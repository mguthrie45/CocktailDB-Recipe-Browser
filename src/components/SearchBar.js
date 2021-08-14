import React from 'react';

class SearchBar extends React.Component {
  state = {name: ''};

  componentDidMount() {
    this.props.onSubmit(this.state.name);
  }

  onFormSubmit = (evt) => {
    evt.preventDefault();

    this.props.onSubmit(this.state.name);
    console.log(this.state.name);
  }

  onSearchChange = (evt) => {
    let name = evt.target.value;
    this.setState({name: name});
  }

  render() {
    return (
      <div className='item'>
        <div>
          <form onSubmit={this.onFormSubmit} className='ui form'>
            <div className='field'>
              <input type='text' placeholder='Search drinks...' value={this.state.name} onChange={e => this.onSearchChange(e)}>
              </input>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SearchBar;
