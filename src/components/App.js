import './style/App.css';
import React from 'react';
import axios from 'axios';
import List from './List.js'
import TaskBar from './TaskBar.js';
import {filterDrinks} from '../utils.js';

class App extends React.Component {
  state = {
    loading: false,
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
  }

  getIngredients = async () => {
    let path = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
    let response = await axios.get(path);
    this.setState({ingredients: response.data.drinks});
  }

  getGlasses = async () => {
    let path = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list';
    let response = await axios.get(path);
    this.setState({glasses: response.data.drinks});
  }

  setDrinksByName = async (name) => {
    this.setState({loading: true});
    let path = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + name;
    let response = await axios.get(path);
    if (response.data.drinks == null) {
      this.setState({invalidSearch: true});
    }
    else {
      this.setState({invalidSearch: false});
    }
    this.setState({data: response.data.drinks}, () => {
      this.setState({loading: false});
    });
  }

  getDrinksByNames = async (names) => {
    let drinks = [];
    for (let id in names) {
      let name = names[id];
      let path = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + name;
      let response = await axios.get(path);
      let data = response.data.drinks;
      if (drinks !== null) {
        if (data.length > 1) {
          for (let id in data) {
            let item = data[id];
            if (item.strDrink === name) {
              drinks.push(item);
            }
          }
        }
        else {
          drinks.push(data[0]);
        }
      }
    }

    //make drinks array unique to avoid overlapping requests
    drinks = drinks.filter((item, index, self) => {
      return drinks.indexOf(item) === index;
    });
    return drinks;
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
    this.setState({loading: true});

    let drinks = null;
    if (name !== '' && name !== null) {
      //if a name is searched, the data will already be in state.
      drinks = this.state.data;
    }
    if (drinks !== null && category !== null) {
      //find intersection of already existing data with data by category
      let catDrinks = await this.getDrinksByCategory(category);
      drinks.splice(0, drinks.length, ...filterDrinks(drinks, catDrinks));
    }
    else if (category !== null) {
      //set data to search by category
      drinks = await this.getDrinksByCategory(category);
    }

    if (drinks !== null && glass !== null) {
      //find intersection of already existing data with data by glass
      let glassDrinks = await this.getDrinksByGlass(glass);
      drinks.splice(0, drinks.length, ...filterDrinks(drinks, glassDrinks));
    }
    else if (glass !== null) {
      //set data to search by glass
      drinks = await this.getDrinksByGlass(glass);
    }

    let names = drinks.map((item) => {
      return item.strDrink;
    });

    let finalDrinks = await this.getDrinksByNames(names);
    
    this.setState({data: finalDrinks}, () => {
      this.setState({loading: false});
    });
  }

  renderContent() {
    if (this.state.data == null && !this.state.invalidSearch || this.state.loading) {
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
            <div className="ui active dimmer">
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
