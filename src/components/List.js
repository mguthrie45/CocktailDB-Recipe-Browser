import React from 'react';
import ListItem from './ListItem.js';

function getIngredientsFromDrink(drinkObject) {
  const MAX = 15;
  const ROOT = 'strIngredient';
  let ingredients = [];
  for (let i = 1; i < MAX+1; i++) {
    let key = ROOT + String(i);
    let ingredient = drinkObject[key];
    if (ingredient == null) {
      break;
    }
    ingredients.push(ingredient);
  }

  return ingredients;
}

class List extends React.Component {
  mapResults() {
    let list = this.props.data.map((item) => {
      return (
        <ListItem key={item.idDrink}
          name={item.strDrink}
          cat={item.strCategory}
          src={item.strSource}
          imgSrc={item.strDrinkThumb}
          ingredients={getIngredientsFromDrink(item)}
          glass={item.strGlass}
          instructions={item.strInstructions}
        />
      );
    });

    return list;
  }

  render() {
    return (
      <div className='ui six column grid' style={{width: '80%', marginLeft: 'auto', marginRight: 'auto'}}>
        {this.mapResults()}
      </div>
    );
  }
}

export default List;
