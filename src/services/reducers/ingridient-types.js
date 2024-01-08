import {
  GET_INGRIDIENTS_TYPES_FAILED,
  GET_INGRIDIENTS_TYPES_REQUEST,
  GET_INGRIDIENTS_TYPES_SUCCESS,
  SET_CURRENT_INGRIDIENTS_TYPE,
} from '../actions/ingridients-types';

const initialState = {
  items: [],
  currentItem: {},
  isFetching: false,
  itemsLoaded: false,
};

export const ingridientsTypesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGRIDIENTS_TYPES_REQUEST: {
      return {
        ...initialState,
        isFetching: true,
        itemsLoaded: false,
      }
    }
    case GET_INGRIDIENTS_TYPES_SUCCESS: {
      return {
        ...state,
        items: action.payload.ingridientsTypes,
        isFetching: false,
        itemsLoaded: true,
      }
    }
    case GET_INGRIDIENTS_TYPES_FAILED: {
      return {
        ...state,
        isFetching: false,
      }
    }
    case SET_CURRENT_INGRIDIENTS_TYPE: {
      return {
        ...state,
        currentItem: { ...action.payload.ingridientsType }
      }
    }
    default: {
      return state;
    }
  }
}
