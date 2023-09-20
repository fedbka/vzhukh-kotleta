import {
  ADD_CHOSEN_INGRIDIENT,
  CHANGE_POSITION_OF_CHOSEN_INGRIDIENT,
  CLEAR_CHOSEN_INGRIDIENTS,
  DELETE_CHOSEN_INGRIDIENT,
} from '../actions/chosen-ingridients';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  items: [],
};

export const chosenIngridientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CHOSEN_INGRIDIENT: {
      return {
        ...state,
        items: action.item.type !== 'bun' ? [...state.items, { ...action.item, uuid:  uuidv4()}] : [...state.items.filter(item => item.type !== 'bun'), {...action.item, uuid: uuidv4()}],
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
    case CLEAR_CHOSEN_INGRIDIENTS: {
      return {...initialState};
    }
    default: {
      return state;
    }
  }
}