function filterDrinks(a1, a2) {
    let drinks = [];
    for (let id1 in a1) {
        let drink1 = a1[id1];
        for (let id2 in a2) {
            let drink2 = a2[id2];
            if (drink1.strDrink === drink2.strDrink) {
                drinks.push(drink1);
            }
        }
    }
    return drinks;
}

export {filterDrinks};