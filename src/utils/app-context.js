import React from 'react';

export const orderDataInitialState = {
        'name' : undefined,
        'number' : undefined,
};

export const IngridientsContext = React.createContext({});
export const OrderContext = React.createContext(orderDataInitialState);