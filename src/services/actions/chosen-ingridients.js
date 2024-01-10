
export const ADD_CHOSEN_INGRIDIENT = 'ADD_CHOSEN_INGRIDIENT';
export const addChosenIngridient = (item) => ({
  type: ADD_CHOSEN_INGRIDIENT,
  item: item,
});
export const DELETE_CHOSEN_INGRIDIENT = 'DELETE_CHOSEN_INGRIDIENT';
export const deleteChosenIngridient = (item) => ({
  type: DELETE_CHOSEN_INGRIDIENT,
  item: item,
});

export const CLEAR_CHOSEN_INGRIDIENTS = 'CLEAR_CHOSEN_INGRIDIENTS';
export const clearChosenIngridients = () => ({
  type: CLEAR_CHOSEN_INGRIDIENTS,
});

export const CHANGE_POSITION_OF_CHOSEN_INGRIDIENT = 'CHANGE_POSITION_OF_CHOSEN_INGRIDIENT';
export const changePositoinOfChesenIngridient = (target, source) => ({
  type: CHANGE_POSITION_OF_CHOSEN_INGRIDIENT,
  target: target,
  source: source,
});

