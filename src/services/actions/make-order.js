import Api from "../api";
import { getTokens } from "./authentication";
import { CLEAR_CHOSEN_INGRIDIENTS } from "./chosen-ingridients";
import { RESET_INGRIDIENT_QUANTITY } from "./ingridients";

export const MAKE_ORDER_REQUEST = 'MAKE_ORDER_REQUEST';
export const makeOrderRequest = () => ({
  type: MAKE_ORDER_REQUEST,
});

export const MAKE_ORDER_SUCCESS = 'MAKE_ORDER_SUCCESS';
export const makeOrderSuccess = (data) => ({
  type: MAKE_ORDER_SUCCESS,
  payload: data,
});

export const MAKE_ORDER_FAILED = 'MAKE_ORDER_FAILED';
export const makeOrderFailed = () => ({
  type: MAKE_ORDER_FAILED,
});


export function makeOrder(chosenIngridients) {
  return function (dispatch) {
    dispatch(makeOrderRequest());
    const {accessToken} = getTokens();
    Api.makeOrder(chosenIngridients, accessToken)
      .then(res => {
        if (res && res.success) {
          dispatch(makeOrderSuccess({ description: res.name, number: res.order.number }));
          dispatch({
            type: CLEAR_CHOSEN_INGRIDIENTS,
          });
          dispatch({ type: RESET_INGRIDIENT_QUANTITY })
        } else {
          dispatch(makeOrderFailed());
        }
      }).catch(err => {
        console.log(err);
        dispatch(makeOrderFailed())
      });
  };
}