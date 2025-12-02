export const addAliasToData = (keys, data) => {
  return data.map((element) => {
    return {
      ...element,
      alias: keys[element.id],
    };
  });
};

export const getMaxPizzaAlias = (pizzas) => {
  let result = "";
  let maxPizzaSize = 0;

  if (pizzas && pizzas.length) {
    pizzas.forEach((pizza) => {
      const pizzaSize = +pizza.name.split(" ")[0];

      if (pizzaSize > maxPizzaSize) {
        result = pizza.alias;
        maxPizzaSize = pizzaSize;
      }
    });
  }

  return result;
};
