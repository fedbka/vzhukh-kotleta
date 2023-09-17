import {
  GET_INGRIDIENTS_TYPES_REQUEST,
  GET_INGRIDIENTS_TYPES_SUCCESS,
  GET_INGRIDIENTS_TYPES_FAILED,
  SET_CURRENT_INGRIDIENTS_TYPE,
} from '../actions/ingridients-types';

const initialState = {
  items: [],
  currentItem: {},
  requested: false,
  requestFailed: false,
};

export const ingridientsTypesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGRIDIENTS_TYPES_REQUEST: {
      return {
        ...state,
        items: initialState.items,
        requested: true,
        requestFailed: false,
      }
    }
    case GET_INGRIDIENTS_TYPES_SUCCESS: {
      return {
        ...state,
        items: action.items,
        requested: false,
      }
    }
    case GET_INGRIDIENTS_TYPES_FAILED: {
      return {
        ...state,
        requested: false,
        requestFailed: true,
      }
    }
    case SET_CURRENT_INGRIDIENTS_TYPE: {
      return {
        ...state,
        currentItem: {...action.item}
      }
    }
    default: {
      return state;
    }
  }
}