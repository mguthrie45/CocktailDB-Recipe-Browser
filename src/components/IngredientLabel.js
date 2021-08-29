import React from 'react';
import './style/IngredientLabel.css';

const IngredientLabel = (props) => {
    return (
        <div id='label-cont'> 
            <div className="ui large black label" key={props.key} style={{color: 'white', backgroundColor: 'black', borderRadius: '0'}}>
                {props.name}
            </div>
            <i className="close icon" onClick={(evt) => {
                    evt.preventDefault();
                    props.delete(evt.target.value);
                }}>
            </i>
        </div>
    );
}

export default IngredientLabel;