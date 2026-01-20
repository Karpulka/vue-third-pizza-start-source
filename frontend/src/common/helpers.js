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

export const getImageUrl = (imageUrl) =>
  new URL(`../assets/img/${imageUrl}`, import.meta.url).href;

export const getParamName = (alias, paramsMap, params) => {
  const paramId = Object.keys(paramsMap).find(
    (index) => paramsMap[index] === alias
  );
  return params.find((item) => item.id === +paramId).name;
};
