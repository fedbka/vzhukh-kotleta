import {
  MAKE_ORDER_REQUEST,
  MAKE_ORDER_SUCCESS,
  MAKE_ORDER_FAILED,
} from '../actions/make-order';

const initialState = {
  description: '',
  number: null,
  makeOrderRequest: false,
  makeOrderFalied: false,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case MAKE_ORDER_REQUEST: {
      return {
        ...state,
        description: initialState.description,
        number: initialState.number,
        makeOrderRequest: true,
        makeOrderFalied: false,
      }
    }
    case MAKE_ORDER_SUCCESS: {
      return {
        ...state,
        description: action.data.description,
        number: action.data.number,
        items: action.items,
        makeOrderRequest: false,
      }
    }
    case MAKE_ORDER_FAILED: {
      return {
        ...state,
        makeOrderRequest: false,
        makeOrderFalied: true,
      }
    }
    default: {
      return state;
    }
  }
}

