
export const getOrderNormalizedData = (order, ingredients) => {
  const orderIngredients = order.ingredients.flatMap(id => id ? ingredients.find(item => item._id === id) : []);
  const orderIngredientsCount = [...new Set(orderIngredients)].map(element => [element, orderIngredients.filter(item => item === element).length]);
  const orderPrice = orderIngredientsCount.reduce((price, [item, count]) => price + (item.price * ((item.type === 'bun' && count === 1) ? 2 : count)), 0);
  return {
    orderPrice,
    orderIngredientsCount
  }
}

export const getOrderStatusText = (status) => {
  switch (status) {
    case "created": return "Создан";
    case "pending": return "Готовится";
    case "canceled": return "Отменен";
    case "done": return "Выполнен"
    default: return status;
  }
}

export const getOrderTimeZoneText = (time) => {
  const orderTime = new Date(time);
  const timeZone = orderTime?.getTimezoneOffset() / 60;
  return  " i-GMT" + (timeZone > 0 ? "+" : "") + timeZone;
}