import {
  ADD_CHOSEN_INGRIDIENT,
  CHANGE_POSITION_OF_CHOSEN_INGRIDIENT,
  CLEAR_CHOSEN_INGRIDIENTS,
  DELETE_CHOSEN_INGRIDIENT,
} from '../actions/chosen-ingridients';


const initialState = {
  items: [],
};

export const chosenIngridientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CHOSEN_INGRIDIENT: {
      return {
        ...state,
        items: action.item.type !== 'bun' ? [...state.items, { ...action.item }] : [...state.items.filter(item => item.type !== 'bun'), { ...action.item }],
      }
    }
    case DELETE_CHOSEN_INGRIDIENT: {
      return {
        ...state,
        items: [...state.items.filter(item => item.uuid !== action.item.uuid)],
      }
    }
    case CHANGE_POSITION_OF_CHOSEN_INGRIDIENT: {
      let targetindex = null;
      const newOrder = [...state.items.filter((item, index) => {
        if (item.uuid === action.target.uuid) { targetindex = index };
        return item.uuid !== action.source.uuid;
      })];
      newOrder.splice(targetindex, 0, { ...action.source });
      return {
        ...state,
        items: [...newOrder],
      }
    }
    case CLEAR_CHOSEN_INGRIDIENTS: {
      return { ...initialState };
    }
    default: {
      return state;
    }
  }
}
