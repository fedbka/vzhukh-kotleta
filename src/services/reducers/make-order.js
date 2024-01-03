import {
  MAKE_ORDER_FAILED,
  MAKE_ORDER_REQUEST,
  MAKE_ORDER_SUCCESS,
} from '../actions/make-order';

const initialState = {
  description: '',
  number: null,
  requested: false,
  requestFailed: false,
  requestErrorMessage: '',
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case MAKE_ORDER_REQUEST: {
      return {
        ...initialState,
        requested: true,
      }
    }
    case MAKE_ORDER_SUCCESS: {
      return {
        ...state,
        description: action.data.description,
        number: action.data.number,
        items: action.items,
        requested: false,
      }
    }
    case MAKE_ORDER_FAILED: {
      return {
        ...state,
        requested: false,
        requestFailed: true,
      }
    }
    default: {
      return state;
    }
  }
}

