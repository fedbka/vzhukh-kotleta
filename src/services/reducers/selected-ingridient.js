import {
  DELETE_SELECTED_INGRIDIENT,
  SET_SELECTED_INGRIDIENT
} from '../actions/selected-ingridient';

const initialState = {
  item: {},
};

export const selectedIngridientReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_INGRIDIENT: {
      return {
        ...state,
        item: { ...action.item },
      }
    }
    case DELETE_SELECTED_INGRIDIENT: {
      return {
        ...state,
        item: initialState.item,
      }
    }
    default: {
      return state;
    }
  }
}
