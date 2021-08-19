import axios from 'axios';

async function getDrinkByName(name) {
    let path = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + name;
    let response = await axios.get(path);
    
    return response.data.drinks;
}

function filterDrinks(a1, a2) {
    console.log(a1.length + a2.length);
    let drinks = [];
    for (let id1 in a1) {
        let drink1 = a1[id1];
        for (let id2 in a2) {
            let drink2 = a2[id2];
            if (drink1.strDrink === drink2.strDrink) {
                drinks.push(drink2);
            }
        }
    }
    console.log(drinks.length);
    return drinks;
}

export {filterDrinks};