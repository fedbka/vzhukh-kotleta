import { socketActions } from "./socket";

export const GET_ORDERS_REQUEST = "GET_ORDERS_REQUEST";
export const getOrdersRequest = (payload) => ({
  type: GET_ORDERS_REQUEST,
  payload: payload,
});

export const GET_ORDERS_SUCCESS = "GET_ORDERS_SUCCESS";
export const getOrdersSuccess = (payload) => ({
  type: GET_ORDERS_SUCCESS,
  payload: payload,
});

export const GET_ORDERS_FAILED = "GET_ORDERS_FAILED";
export const getOrdersFailed = (payload) => ({
  type: GET_ORDERS_FAILED,
  payload: payload,
});

export const RESET_ORDERS = "RESET_ORDERS";
export const resetOrders = () => ({
  type: RESET_ORDERS,
})

export const ordersSocketAction = {
  ...socketActions,
  connectOn: GET_ORDERS_REQUEST,
  onClose: [...socketActions.onClose, resetOrders],
  onInboundMessage: [...socketActions.onInboundMessage, getOrdersSuccess],

}


