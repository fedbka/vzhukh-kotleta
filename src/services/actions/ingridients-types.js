import Api from "../api";

export const GET_INGRIDIENTS_TYPES_REQUEST = 'GET_INGRIDIENTS_TYPES_REQUEST';
export const getIngridientsTypesRequest = () => ({
  type: GET_INGRIDIENTS_TYPES_REQUEST
});

export const GET_INGRIDIENTS_TYPES_SUCCESS = 'GET_INGRIDIENTS_TYPES_SUCCESS';
export const getIngridientsTypesSuccess = (ingridientsTypes) => ({
  type: GET_INGRIDIENTS_TYPES_SUCCESS,
  payload: { ingridientsTypes },
});

export const GET_INGRIDIENTS_TYPES_FAILED = 'GET_INGRIDIENTS_TYPES_FAILED';
export const getIngridientsTypesFailed = () => ({
  type: GET_INGRIDIENTS_TYPES_FAILED,
});

export const SET_CURRENT_INGRIDIENTS_TYPE = 'SET_CURRENT_INGRIDIENTS_TYPE';
export const setCurrentIngridientsType = (ingridientsType) => ({
  type: SET_CURRENT_INGRIDIENTS_TYPE,
  payload: { ingridientsType },
});

export function getIngridientsTypes() {
  return function (dispatch) {
    dispatch(getIngridientsTypesRequest());
    Api.getIngridientsTypes()
      .then(res => {
        if (res && res.success) {
          dispatch(getIngridientsTypesSuccess(res.data));
          dispatch(setCurrentIngridientsType(res.data[0] ? res.data[0] : {}));
        } else {
          dispatch(getIngridientsTypesFailed());
          dispatch(setCurrentIngridientsType({}));
        }
      })
      .catch(err => {
        dispatch(getIngridientsTypesFailed());
        dispatch(setCurrentIngridientsType({}));
      });
  }
}