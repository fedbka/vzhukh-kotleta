import {
  DECREASE_INGRIDIENT_QUANTITY,
  GET_INGRIDIENTS_FAILED,
  GET_INGRIDIENTS_REQUEST,
  GET_INGRIDIENTS_SUCCESS,
  INCREASE_INGRIDIENT_QUANTITY,
  RESET_INGRIDIENT_QUANTITY
} from '../actions/ingridients';

const initialState = {
  items: [],
  isFetching: false,
  itemsLoaded: false,
};

export const ingridientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGRIDIENTS_REQUEST: {
      return {
        ...state,
        items: initialState.items,
        isFetching: true,
        itemsLoaded: false,
      }
    }
    case GET_INGRIDIENTS_SUCCESS: {
      return {
        ...state,
        items: action.payload.ingridients,
        isFetching: false,
        itemsLoaded: true,
      }
    }
    case GET_INGRIDIENTS_FAILED: {
      return {
        ...state,
        isFetching: false,
      }
    }
    case INCREASE_INGRIDIENT_QUANTITY: {
      return {
        ...state,
        items: [...state.items.map(item => {
          if (action.payload.ingridient.type === 'bun') {
            return item._id === action.payload.ingridient._id ? { ...item, __v: 2 } : item.type === 'bun' ? { ...item, __v: 0 } : { ...item };
          } else {
            return item._id === action.payload.ingridient._id ? { ...item, __v: item.__v + action.payload.quantity } : item;
          }
        })],
      }
    }
    case DECREASE_INGRIDIENT_QUANTITY: {
      return {
        ...state,
        items: [...state.items.map(item => item._id === action.payload.ingridient._id ? { ...item, __v: item.__v - action.payload.quantity } : item)],
      }
    }
    case RESET_INGRIDIENT_QUANTITY: {
      return {
        ...state,
        items: [...state.items.map(item => ({ ...item, __v: 0 }))],
      }
    }
    default: {
      return state;
    }
  }
}
