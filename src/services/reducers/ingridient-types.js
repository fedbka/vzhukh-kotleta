import {
  GET_INGRIDIENTS_TYPES_FAILED,
  GET_INGRIDIENTS_TYPES_REQUEST,
  GET_INGRIDIENTS_TYPES_SUCCESS,
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
        ...initialState,
        requested: true,
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
        currentItem: { ...action.item }
      }
    }
    default: {
      return state;
    }
  }
}
