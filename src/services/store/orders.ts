import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { TOrders, TOrdersState } from "../../types/types.ts";
import { ordersApi } from "../api/orders.ts";

const initialState: TOrdersState = {
  orderConfirmation: {},
  orders: [],
  ordersIsLoading: false,
  ordersIsSuccess: false,
  ordersIsError: false,
  ordersQuantityForAllTime: 0,
  ordersQuantityForToday: 0,
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    getOrders: (state, action: PayloadAction<string>) => {
      state.orders = initialState.orders;
      state.ordersIsLoading = true;
      state.ordersIsSuccess = initialState.ordersIsSuccess;
      state.ordersIsError = initialState.ordersIsError;
    },
    loadOrders: (
      state,
      action: PayloadAction<{
        orders: TOrders;
        total: number;
        totalToday: number;
      }>
    ) => {
      state.orders = [...action.payload.orders];
      state.ordersIsLoading = false;
      state.ordersIsSuccess = true;
      state.ordersQuantityForToday = action.payload.totalToday;
      state.ordersQuantityForAllTime = action.payload.total;
    },
    clearOrders: (state) => {
      state.orders = initialState.orders;
      state.ordersIsLoading = initialState.ordersIsLoading;
      state.ordersIsSuccess = initialState.ordersIsSuccess;
      state.ordersIsError = initialState.ordersIsError;
      state.ordersQuantityForAllTime = initialState.ordersQuantityForAllTime;
      state.ordersQuantityForToday = initialState.ordersQuantityForAllTime;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      ordersApi.endpoints.sendOrder.matchFulfilled,
      (state, action) => {
        state.orderConfirmation = action.payload.order ?? {};
      }
    );
  },
  selectors: {
    selectOrderConfirmationNumber: (state) => state.orderConfirmation.number,
    selectOrderConfirmationName: (state) => state.orderConfirmation.name,
    selectOrders: (state) => state.orders,
    selectOrdersIsLoading: (state) => state.ordersIsLoading,
    selectOrdersIsSuccess: (state) => state.ordersIsSuccess,
    selectOrdersQuantityForToday: (state) => state.ordersQuantityForToday,
    selectOrdersQuantityForAllTime: (state) => state.ordersQuantityForAllTime,
  },
});

export const {
  selectOrders,
  selectOrderConfirmationName,
  selectOrderConfirmationNumber,
  selectOrdersIsSuccess,
  selectOrdersIsLoading,
  selectOrdersQuantityForToday,
  selectOrdersQuantityForAllTime,
} = ordersSlice.selectors;

export const { getOrders, clearOrders, loadOrders } = ordersSlice.actions;
export const selectOrderConfirmation = createSelector(
  [
    ordersSlice.selectors.selectOrderConfirmationNumber,
    ordersSlice.selectors.selectOrderConfirmationName,
  ],
  (number, name) => ({ number, name })
);
