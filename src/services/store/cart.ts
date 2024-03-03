import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TCartIngredient, TCartState } from "../../types/types.ts";
import { ordersApi } from "../api/orders.ts";

const initialState: TCartState = {
  data: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<TCartIngredient>) => {
      if (action.payload.type === "bun") {
        state.data = state.data.filter((item) => item.type !== "bun");
      }
      state.data.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<TCartIngredient>) => {
      state.data = state.data.filter(
        (item) => item.uuid !== action.payload.uuid
      );
    },
    changePositionInCart: (
      state,
      action: PayloadAction<{
        source: TCartIngredient;
        target: TCartIngredient;
      }>
    ) => {
      let targetindex: number = 0;
      const newOrder = [
        ...state.data.filter((item, index) => {
          if (item.uuid === action.payload.target.uuid) {
            targetindex = index;
          }
          return item.uuid !== action.payload.source.uuid;
        }),
      ];
      newOrder.splice(targetindex, 0, { ...action.payload.source });
      state.data = [...newOrder];
    },
    clearCart: (state) => {
      state.data = initialState.data;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      ordersApi.endpoints.sendOrder.matchFulfilled,
      (state) => {
        state.data = initialState.data;
      }
    );
  },
  selectors: {
    selectCart: (state) => state.data,
  },
});

export const { addToCart, removeFromCart, changePositionInCart, clearCart } =
  cartSlice.actions;

export const { selectCart } = cartSlice.selectors;
