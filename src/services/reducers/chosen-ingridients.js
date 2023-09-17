import {
  ADD_CHOSEN_INGRIDIENT,
  CHANGE_POSITION_OF_CHOSEN_INGRIDIENT,
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
        items: action.item.type !== 'bun' ? [...state.items, { ...action.item }] : [...state.items.filter(item => item.type !== 'bun'), {...action.item}],
      }
    }
    case DELETE_CHOSEN_INGRIDIENT: {
      return {
        ...state,
        items: [...state.items.filter((item, index) => index !== action.index)],
      }
    }
    case CHANGE_POSITION_OF_CHOSEN_INGRIDIENT: {
      const newOrder = {...state.items};
      [newOrder[action.dragSourceIndex], newOrder[action.dragTargetIndex]] = [newOrder[action.dragTargetIndex], newOrder[action.dragSourceIndex]]; 
      return {
        ...state,
        items: [...newOrder],
      }
    }    
    default: {
      return state;
    }
  }
}