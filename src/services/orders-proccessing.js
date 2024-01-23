
export const getNomalizedOrderData = (order, ingredients) => {
  const orderIngredients = order.ingredients.flatMap(id => id ? ingredients.find(item => item._id === id) : []);
  const orderPrice = orderIngredients.reduce((price, item) => price + item.price, 0);
  const orderIngredientsCount = [...new Set(orderIngredients)].map(element => [element, orderIngredients.filter(item => item === element).length]);
  return {
    orderPrice,
    orderIngredientsCount
  }
}