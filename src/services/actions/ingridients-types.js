import Api from "../api";

export const GET_INGRIDIENTS_TYPES_REQUEST = 'GET_INGRIDIENTS_TYPES_REQUEST';
export const GET_INGRIDIENTS_TYPES_SUCCESS = 'GET_INGRIDIENTS_TYPES_SUCCESS';
export const GET_INGRIDIENTS_TYPES_FAILED =  'GET_INGRIDIENTS_TYPES_FAILED';

export const SET_CURRENT_INGRIDIENTS_TYPE = 'SET_CURRENT_INGRIDIENTS_TYPE';

export function getIngridientsTypes() {
  return function (dispatch) {
    dispatch({
      type: GET_INGRIDIENTS_TYPES_REQUEST,
    });
    Api.getIngridientsTypes().then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_INGRIDIENTS_TYPES_SUCCESS,
          items: res.data,
        });
        dispatch({
          type: SET_CURRENT_INGRIDIENTS_TYPE,
          item: res.data[0] ? res.data[0] : {}, 
        });
      } else {
        dispatch({
          type: GET_INGRIDIENTS_TYPES_FAILED,
        });
      }
    }).catch(err => {
      dispatch({
          type: GET_INGRIDIENTS_TYPES_FAILED,
      })
  });
  };
}