import { FEED_WS_CLOSE, FEED_WS_ERROR, FEED_WS_INBOUND_MESSAGE, FEED_WS_IS_CONNECTING, FEED_WS_OPEN } from "../actions/feed";

const initialState = {
  isFetching: false,
  isError: false,
  isConnected: false,
  errorMessage: "",
  orders: [],
  numberOfOrdersForAllTime: null,
  numberOfOrdersForToday: null,
}

export const feedReducer = (state = initialState, action) => {
  switch (action.type) {
    case FEED_WS_IS_CONNECTING:
      return {
        ...state,
        isFetching: true,
        isError: false,
        isConnected: false,
      };
    case FEED_WS_OPEN:
      return {
        ...state,
        isError: false,
        isConnected: true,
      }
    case FEED_WS_CLOSE:
      return {
        ...state,
        isFetching: false,
        isConnected: false,
      }
    case FEED_WS_ERROR:
      return {
        ...state,
        isFetching: false,
        isError: true,
        errorMessage: action.payload,
      }
    case FEED_WS_INBOUND_MESSAGE:
      return {
        ...state,
        isFetching: false,
        isConnected: true,
        isError: false,
        errorMessage: "",
        orders: action.payload.orders,
        numberOfOrdersForAllTime: action.payload.total,
        numberOfOrdersForToday: action.payload.totalToday,
      }
    default:
      return state;
  }
}