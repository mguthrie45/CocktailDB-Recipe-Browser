import React from 'react';

class FilterBox extends React.Component {
  state = {};
  defaults = ['type', 'ingredients', 'glass'];

  mapOptions() {
    if (this.props.options !== null) {

      //sort alphabetically
      this.props.options.sort((a, b) => {
        return a.strIngredient1 > b.strIngredient1 ? 1: -1;
      });

      let list = null;
      if (this.props.category == 'ingredients') {
        list = this.props.options.map((item, key) => {
          return (
            <option key={key} value={item.strIngredient}>{item.strIngredient1}</option>
          );
        });
      }
      else if (this.props.category == 'type') {

        //sort alphabetically
        this.props.options.sort((a, b) => {
          return a.strCategory > b.strCategory ? 1: -1;
        });

        list = this.props.options.map((item, key) => {
          return (
            <option key={key} value={item.strCategory}>{item.strCategory}</option>
          );
        });
      }
      else if (this.props.category == 'glass') {

        //sort alphabetically
        this.props.options.sort((a, b) => {
          return a.strGlass > b.strGlass ? 1: -1;
        });

        list = this.props.options.map((item, key) => {
          return (
            <option key={key} value={item.strGlass}>{item.strGlass}</option>
          );
        });
      }
      return list;
    }
    return null;
  }

  onItemChange = (evt) => {
    evt.preventDefault();
    let itemName = evt.target.value;
    if (itemName === '') {
      itemName = null;
    }

    if (this.props.category === 'ingredients') {
      this.props.onItemChange(itemName);
      return;
    }
    this.props.onItemChange(itemName);
  }

  render() {
    return (
      <div className='item' style={{paddingLeft: '0'}}>
        <select onChange={this.onItemChange} className="ui search dropdown" style={{backgroundColor: '#202020', border: '1px solid white', color: 'white'}}>
          <option value=''>{this.props.category}</option>
          {this.mapOptions()}
        </select>
      </div>
    );
  }
}

export default FilterBox;
