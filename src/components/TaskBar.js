import React from 'react';
import SearchBar from './SearchBar.js';
import FilterBox from './FilterBox.js';

class TaskBar extends React.Component {
  state = {name: null, ingredient: null, category: null, glass: null};

  //callback for asynchronous setState
  filterer = () => {
    this.props.filterer(
      this.state.name,
      this.state.ingredient,
      this.state.category,
      this.state.glass
    );
  }

  onIngredChange = (ingredient) => {
    this.setState({ingredient: ingredient}, this.filterer);
  }

  onCatChange = (category) => {
    this.setState({category: category}, this.filterer);
  }

  onGlassChange = (glass) => {
    this.setState({glass: glass}, this.filterer);
  }

  render() {

    return (
      <div className='ui four item menu' style={{marginBottom: '40px'}}>
        <SearchBar onSubmit={this.props.onSearch}/>
        <FilterBox
          onItemChange={this.onIngredChange}
          category='ingredients'
          options={this.props.ingredients}
        />
        <FilterBox
          onItemChange={this.onCatChange}
          category='type'
          options={this.props.categories}
        />
        <FilterBox
          onItemChange={this.onGlassChange}
          category='glass'
          options={this.props.glasses}
        />
      </div>
    )
  }
}

export default TaskBar;
