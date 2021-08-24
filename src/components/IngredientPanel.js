import React from 'react';
import './style/IngredientPanel.css';

class IngredientPanel extends React.Component {
    mapIngredients() {
        let ingredients = this.props.ingredients.map((item) => {
            return (
                <div className="ui black horizontal label" style={{color: 'white', borderRadius: '0'}}>{item}</div>
            );
        });
        return ingredients;
    }

    render() {
        return (
            <div className='ui container' id='panel'>
                {this.mapIngredients()}
            </div>
        );
    }
}

export default IngredientPanel;