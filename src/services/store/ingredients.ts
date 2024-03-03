import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/react";
import { TCartIngredient, TIngredientsState } from "../../types/types.ts";
import { ingredientsApi } from "../api/ingredients.ts";
import { cartSlice } from "./cart.ts";
import { ordersApi } from "../api/orders.ts";

const initialState: TIngredientsState = {
  data: [],
};

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      ingredientsApi.endpoints.getIngredients.matchFulfilled,
      (state, action) => {
        state.data = action.payload;
      }
    );
    builder.addMatcher(
      (action) =>
        action.type === cartSlice.actions.addToCart.type ||
        action.type === cartSlice.actions.removeFromCart.type,
      (state, action: PayloadAction<TCartIngredient>) => {
        const ingredient = action.payload as TCartIngredient;
        const delta = action.type === cartSlice.actions.addToCart.type ? 1 : -1;
        state.data = state.data.map((item) =>
          item._id !== ingredient._id
            ? ingredient.type === "bun" && item.type === "bun"
              ? { ...item, __v: 0 }
              : item
            : { ...item, __v: item.type === "bun" ? 2 : item.__v + delta }
        );
      }
    );
    builder.addMatcher(
      (action) => action.type === cartSlice.actions.clearCart.type,
      (state) => {
        state.data = state.data.map((item) => ({ ...item, __v: 0 }));
      }
    );
    builder.addMatcher(
      ordersApi.endpoints.sendOrder.matchFulfilled,
      (state) => {
        state.data = state.data.map((item) => ({ ...item, __v: 0 }));
      }
    );    
  },
  selectors: {
    selectIngredients: (state) => state.data,
  },
});

export const { selectIngredients } = ingredientsSlice.selectors;
