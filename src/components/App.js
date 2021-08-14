import './style/App.css';
import React from 'react';
import axios from 'axios';
import List from './List.js'
import TaskBar from './TaskBar.js';

class App extends React.Component {
  state = {
    loaded: false,
    data: null,
    invalidSearch: false,
    categories: null,
    ingredients: null,
    glasses: null
  };

  componentDidMount() {
    this.getCategories();
    this.getIngredients();
    this.getGlasses();
  }

  getCategories = async () => {
    let path = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    let response = await axios.get(path);
    this.setState({categories: response.data.drinks});
    console.log(this.state.categories);
  }

  getIngredients = async () => {
    let path = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
    let response = await axios.get(path);
    this.setState({ingredients: response.data.drinks});
    console.log(this.state.ingredients);
  }

  getGlasses = async () => {
    let path = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list';
    let response = await axios.get(path);
    this.setState({glasses: response.data.drinks});
    console.log(this.state.glasses);
  }

  setDrinksByName = async (name) => {
    this.setState({data: null});
    let path = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + name;
    let response = await axios.get(path);
    if (response.data.drinks == null) {
      this.setState({invalidSearch: true});
    }
    else {
      this.setState({invalidSearch: false});
    }
    this.setState({data: response.data.drinks});
    console.log(this.state.data);
  }

  getDrinksByName = async (name) => {
    let path = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + name;
    let response = await axios.get(path);
    return response.data.drinks;
  }

  getDrinksByCategory = async (cat) => {
    let path = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=' + cat;
    let response = await axios.get(path);
    return response.data.drinks;
  }

  getDrinkByIngredient = async (ingredient) => {
    let path = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + ingredient;
    let response = await axios.get(path);
    return response.data.drinks;
  }

  getDrinksByIngredients = (ingredients) => {
    let filteredDrinks = [];
    for (let ingredient in ingredients) {
      let drinks = this.getDrinkByIngredient(ingredient).drinks;
      if (filteredDrinks.length == 0) {
        filteredDrinks = drinks;
      }
      else {
        filteredDrinks = filteredDrinks.filter((item) => {
          return drinks.includes(item);
        });
        if (filteredDrinks.length == 0) {
          break;
        }
      }
    }

    return filteredDrinks;
  }

  getDrinksByGlass = async (glass) => {
    let path = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=' + glass;
    let response = await axios.get(path);
    return response.data.drinks;
  }

  filter = async (name, ingredient, category, glass) => {
    let drinks = null;
    if (name !== '' && name !== null) {
      //if a name is searched, the data will already be in state.
      drinks = this.state.data;
    }
    if (drinks !== null && category !== null) {
      //find intersection of already existing data with data by category
      let catDrinks = await this.getDrinksByCategory(category);
      drinks = drinks.filter((item) => {
        return catDrinks.includes(item);
      });
    }
    else if (category !== null) {
      //set data to search by category
      drinks = await this.getDrinksByCategory(category);
    }

    if (drinks !== null && glass !== null) {
      //find intersection of already existing data with data by glass
      let glassDrinks = await this.getDrinksByGlass(glass);
      drinks = drinks.filter((item) => {
        return glassDrinks.includes(item);
      });
    }
    else if (glass !== null) {
      //set data to search by glass
      drinks = await this.getDrinksByGlass(glass);
    }

    console.log(drinks);
  }

  renderContent() {
    if (this.state.data == null && !this.state.invalidSearch) {
      return (
        <div style={{width: '80%', minWidth: '860px', marginLeft: 'auto', marginRight: 'auto'}}>
          <TaskBar
            categories={this.state.categories}
            ingredients={this.state.ingredients}
            glasses={this.state.glasses}
            onSearch={this.setDrinksByName}
            filterer={this.filter}
          />
          <div id='loading'>
            <div className="ui inverted active dimmer">
              <div className="ui loader"></div>
            </div>
          </div>
        </div>
      );
    }
    else if (this.state.data == null && this.state.invalidSearch) {
      console.log('invalid search');
      return (
        <div style={{width: '80%', minWidth: '860px', marginLeft: 'auto', marginRight: 'auto'}}>
          <TaskBar
            categories={this.state.categories}
            ingredients={this.state.ingredients}
            glasses={this.state.glasses}
            onSearch={this.setDrinksByName}
            filterer={this.filter}
          />
          <div>Invalid Search</div>
        </div>
      )
    }
    else {
      return (
        <div style={{width: '80%', minWidth: '860px', marginLeft: 'auto', marginRight: 'auto'}}>
          <TaskBar
            categories={this.state.categories}
            ingredients={this.state.ingredients}
            glasses={this.state.glasses}
            onSearch={this.setDrinksByName}
            filterer={this.filter}
          />
          <List data={this.state.data}/>
        </div>
      );
    }
  }

  render() {
    return this.renderContent();
  }
}

export default App;
