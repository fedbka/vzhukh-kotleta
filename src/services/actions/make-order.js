import Api from "../api";
import { CLEAR_CHOSEN_INGRIDIENTS } from "./chosen-ingridients";
import { getIngridients } from "./ingridients";

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
          dispatch({
            type: CLEAR_CHOSEN_INGRIDIENTS,
          });
          dispatch(getIngridients());
        } else {
          dispatch({
            type: MAKE_ORDER_FAILED,
          });
        }
      }).catch(err => {
        dispatch({
            type: MAKE_ORDER_FAILED,
        })
    });
    };
  }