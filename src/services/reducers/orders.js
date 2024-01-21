import { GET_ORDERS_FAILED, GET_ORDERS_REQUEST, GET_ORDERS_SUCCESS, RESET_ORDERS } from "../actions/orders";

const initialState = {
  items: [],
  isFetching: false,
  isError: false,
  itemsLoaded: false,
  numberOfOrdersForAllTime: 0,
  numberOfOrdersForToday: 0,
};

export const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS_REQUEST: {
      return {
        ...initialState,    
        isFetching: true,
      }
    }
    case GET_ORDERS_SUCCESS: {
      return {
        ...state,
        items: [...action.payload.orders],
        numberOfOrdersForAllTime: action.payload.total,
        numberOfOrdersForToday: action.payload.totalToday,        
        isFetching: false,
        itemsLoaded: true,
      }
    }
    case GET_ORDERS_FAILED: {
      return {
        ...state,
        items: [],
        isFetching: false,
        isError: true,
      }
    }
    case RESET_ORDERS: {
      return {
        ...initialState,
      }
    }
    default: {
      return state;
    }
  }
}