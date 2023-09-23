import { combineReducers } from 'redux';
import { ingridientsReducer } from './ingridients';
import { ingridientsTypesReducer } from './ingridient-types';
import { chosenIngridientsReducer } from './chosen-ingridients';
import { orderReducer } from './make-order';
import { selectedIngridientReducer } from './selected-ingridient';

export const rootReducer = combineReducers({
    ingridients: ingridientsReducer,
    ingridientsTypes: ingridientsTypesReducer,
    chosenIngridients: chosenIngridientsReducer,
    order: orderReducer,
    selectedIngridient: selectedIngridientReducer,
});