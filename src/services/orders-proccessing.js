
export const getNomalizedOrderData = (order, ingredients) => {
  const orderIngredients = order.ingredients.flatMap(id => id ? ingredients.find(item => item._id === id) : []);
  const orderIngredientsCount = [...new Set(orderIngredients)].map(element => [element, orderIngredients.filter(item => item === element).length]);
  const orderPrice = orderIngredientsCount.reduce((price, [item, count]) => price + (item.price * ((item.type === 'bun' && count === 1) ? 2 : count)), 0);
  return {
    orderPrice,
    orderIngredientsCount
  }
}