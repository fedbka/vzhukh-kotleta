import Api from "../api";

export const MAKE_ORDER_REQUEST = 'MAKE_ORDER_REQUEST';
export const MAKE_ORDER_SUCCESS = 'MAKE_ORDER_SUCCESS';
export const MAKE_ORDER_FAILED = 'MAKE_ORDER_FAILED';

export function makeOrder(chosenIngridients) {
    return function (dispatch) {
      dispatch({
        type: MAKE_ORDER_REQUEST,
      });
      Api.makeOrder(chosenIngridients).then(res => {
        if (res && res.success) {
          dispatch({
            type: MAKE_ORDER_SUCCESS,
            data: { description: res.name, number: res.order.number},
          });
        } else {
          dispatch({
            type: MAKE_ORDER_FAILED,
          });
        }
      });
    };
  }