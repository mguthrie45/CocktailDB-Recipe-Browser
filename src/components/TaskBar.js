import React from 'react';
import SearchBar from './SearchBar.js';
import FilterBox from './FilterBox.js';
import IngredientPanel from './IngredientPanel.js';
import SearchButton from './SearchButton.js';
import './style/TaskBar.css'

class TaskBar extends React.Component {
  state = {name: null, ingredients: [], category: null, glass: null};

  //callback for asynchronous setState
  filterer = () => {
    this.props.filterer(
      this.state.name,
      this.state.ingredients,
      this.state.category,
      this.state.glass
    );
  }

  deleteIngredient = (name) => {
    let ingredients = this.state.ingredients.map((item) => {
        return item;
    });

    let id = ingredients.indexOf(name);
    ingredients.splice(id);

    this.setState({ingredients: ingredients});
  }

  addIngredient = (name) => {
      let ingredients = this.state.ingredients.map((item) => {
          return item;
      });

      ingredients.push(name);

      this.setState({ingredients: ingredients});
  }

  onIngredChange = (ingredients) => {
    this.setState({ingredients: ingredients});
  }

  onCatChange = (category) => {
    this.setState({category: category});
  }

  onGlassChange = (glass) => {
    this.setState({glass: glass});
  }

  render() {

    return (
      <div>
        <div className='ui menu' id='taskbar'>
          <SearchBar onSubmit={this.props.onSearch}/>
          <FilterBox
            onItemChange={this.addIngredient}
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
          <SearchButton onSearch={this.filterer}/>
        </div>
        <IngredientPanel delete={this.deleteIngredient} ingredients={this.state.ingredients}/>
      </div>
    )
  }
}

export default TaskBar;
