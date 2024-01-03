import { combineReducers } from 'redux';
import { chosenIngridientsReducer } from './chosen-ingridients';
import { ingridientsTypesReducer } from './ingridient-types';
import { ingridientsReducer } from './ingridients';
import { orderReducer } from './make-order';
import { selectedIngridientReducer } from './selected-ingridient';

export const rootReducer = combineReducers({
    ingridients: ingridientsReducer,
    ingridientsTypes: ingridientsTypesReducer,
    chosenIngridients: chosenIngridientsReducer,
    selectedIngridient: selectedIngridientReducer,
    order: orderReducer,
});