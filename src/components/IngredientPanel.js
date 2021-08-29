import React from 'react';
import IngredientLabel from './IngredientLabel.js';
import './style/IngredientPanel.css';

class IngredientPanel extends React.Component {
    mapIngredients() {
        let ingredients = this.props.ingredients.map((item, key) => {
            return (
                <IngredientLabel delete={this.props.delete} name={item} key={item}/>
            );
        });
        return ingredients;
    }

    render() {
        return (
            <div className='ui container' id='panel'>
                <div id='child-cont'>
                    {this.mapIngredients()}
                </div>
            </div>
        );
    }
}

export default IngredientPanel;