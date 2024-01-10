import { combineReducers } from 'redux';
import { chosenIngridientsReducer } from './chosen-ingridients';
import { ingridientsTypesReducer } from './ingridient-types';
import { ingridientsReducer } from './ingridients';
import { orderReducer } from './make-order';
import { authenticationReducer } from './authentication';

export const rootReducer = combineReducers({
    ingridients: ingridientsReducer,
    ingridientsTypes: ingridientsTypesReducer,
    chosenIngridients: chosenIngridientsReducer,
    order: orderReducer,
    authentication: authenticationReducer,
});