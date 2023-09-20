import Api from "../api";

export const GET_INGRIDIENTS_REQUEST = 'GET_INGRIDIENTS_REQUEST';
export const GET_INGRIDIENTS_SUCCESS = 'GET_INGRIDIENTS_SUCCESS';
export const GET_INGRIDIENTS_FAILED = 'GET_INGRIDIENTS_FAILED';

export const INCREASE_INGRIDIENT_QUANTITY = 'INCREASE_INGRIDIENT_QUANTITY';
export const DECREASE_INGRIDIENT_QUANTITY = 'DECREASE_INGRIDIENT_QUANTITY';

export function getIngridients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGRIDIENTS_REQUEST,
    });
    Api.getIngridients().then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_INGRIDIENTS_SUCCESS,
          items: res.data,
        });
      } else {
        dispatch({
          type: GET_INGRIDIENTS_FAILED,
        });
      }
    }).catch(err => {
      dispatch({
          type: GET_INGRIDIENTS_FAILED,
      })
  });
  };
}