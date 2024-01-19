import Api from "../api";

export const GET_INGRIDIENTS_REQUEST = 'GET_INGRIDIENTS_REQUEST';
export const getIngridientsRequest = () => ({
  type: GET_INGRIDIENTS_REQUEST,
});

export const GET_INGRIDIENTS_SUCCESS = 'GET_INGRIDIENTS_SUCCESS';
export const getIngridientsSuccess = (ingridients) => ({
  type: GET_INGRIDIENTS_SUCCESS,
  payload: ingridients,
});

export const GET_INGRIDIENTS_FAILED = 'GET_INGRIDIENTS_FAILED';
export const getIngridientsFailed = () => ({
  type: GET_INGRIDIENTS_FAILED,
});

export const INCREASE_INGRIDIENT_QUANTITY = 'INCREASE_INGRIDIENT_QUANTITY';
export const increaseIngridientQuantity = (ingridient, quantity = 1) => ({
  type: INCREASE_INGRIDIENT_QUANTITY,
  payload: { ingridient, quantity },
});

export const DECREASE_INGRIDIENT_QUANTITY = 'DECREASE_INGRIDIENT_QUANTITY';
export const decreaseIngridientQuantity = (ingridient, quantity = 1) => ({
  type: DECREASE_INGRIDIENT_QUANTITY,
  payload: { ingridient, quantity },
});


export const RESET_INGRIDIENT_QUANTITY = 'RESET_INGRIDIENT_QUANTITY';
export const resetIngridientQuantity = () => ({
  type: RESET_INGRIDIENT_QUANTITY,
});


export function getIngridients() {
  return function (dispatch) {
    dispatch(getIngridientsRequest());
    Api.getIngridients()
    .then(res => dispatch(getIngridientsSuccess(res.data)))
    .catch(err => {
      console.log(err);
      dispatch(getIngridientsFailed());
    });
  };
}