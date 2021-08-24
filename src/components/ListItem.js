import React from 'react';
import './style/ListItem.css';

const ListItem = ({name, cat, src, imgSrc, ingredients, glass, instructions}) => {
  return (
    <div className='column' id='card-column'>
      <div className='ui container' id='card-container'>
        <div className="ui card" id='drink-card'>
          <div className="ui slide up masked reveal image">
            <img src={imgSrc} className='visible content' />
            <div className='hidden content' style={{backgroundColor: 'black', color: 'white', height: '100%', padding: '9px', overflowY: 'auto'}}>
                <div className='header' style={{fontSize: '18px', textAlign: 'center', fontWeight: 'bold', paddingTop: '7px', paddingBottom: '10px'}}>Ingredients</div>
                {ingredients.map((ingredient, key) => {
                  if (key == ingredients.length - 1) {
                    return <span key={key} style={{fontSize: '12px'}}>{ingredient}</span>;
                  }
                  return <span key={key} style={{fontSize: '12px'}}>{ingredient}, </span>;
                })}
                <br/>
                <span style={{fontSize: '12px', color: '#afafaf', display: 'block', marginTop: '8px'}}>{instructions}</span>
            </div>
          </div>
          <div className="content" style={{backgroundColor: 'white'}}>
            <span className="header">{name}</span>
            <div className="meta">
              <span className="date">{cat}</span>
            </div>
            <div className='description'>
              <span>{glass}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListItem;
