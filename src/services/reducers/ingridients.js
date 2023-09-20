import {
  GET_INGRIDIENTS_REQUEST,
  GET_INGRIDIENTS_SUCCESS,
  GET_INGRIDIENTS_FAILED,
  INCREASE_INGRIDIENT_QUANTITY,
  DECREASE_INGRIDIENT_QUANTITY,
} from '../actions/ingridients';

const initialState = {
  items: [],
  itemsRequest: false,
  itemsFailed: false,
};

export const ingridientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGRIDIENTS_REQUEST: {
      return {
        ...state,
        items: initialState.items,
        itemsRequest: true,
        itemsFailed: false,
      }
    }
    case GET_INGRIDIENTS_SUCCESS: {
      return {
        ...state,
        items: action.items,
        itemsRequest: false,
      }
    }
    case GET_INGRIDIENTS_FAILED: {
      return {
        ...state,
        itemsRequest: false,
        itemsFailed: true,
      }
    }
    case INCREASE_INGRIDIENT_QUANTITY: {
      return {
        ...state,
        items: [...state.items.map(item => {
          if (action.item.type === 'bun') {
            return item._id === action.item._id ? {...item, __v : 2} : item.type === 'bun' ? {...item, __v: 0} : {...item};
          } else {
            return item._id === action.item._id ? {...item, __v : item.__v + 1} : item;
          }
          })],
      }
    }
    case DECREASE_INGRIDIENT_QUANTITY: {
      return {
        ...state,
        items: [...state.items.map(item => item._id === action.item._id ? {...item, __v : item.__v - 1} : item)],
      }
    }    
    default: {
      return state;
    }
  }
}