import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { TOrders, TOrdersState } from "../../types/types.ts";
import { ordersApi } from "../api/orders.ts";

const initialState: TOrdersState = {
  orderConfirmation: {},
  feedOrders: [],
  feedOrdersIsSuccess: false,
  feedOrdersIsError: false,
  userOrders: [],
  userOrdersIsSuccess: false,
  userOrdersIsError: false,
  ordersQuantityForAllTime: 0,
  ordersQuantityForToday: 0,
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    getFeedOrders: (state, action: PayloadAction<string>) => {
      state.feedOrders = initialState.feedOrders;
      state.feedOrdersIsSuccess = initialState.feedOrdersIsSuccess;
      state.feedOrdersIsError = initialState.feedOrdersIsError;
    },
    loadFeedOrders: (
      state,
      action: PayloadAction<{
        orders: TOrders;
        total: number;
        totalToday: number;
      }>
    ) => {
      state.feedOrders = [...action.payload.orders];
      state.feedOrdersIsSuccess = true;
      state.ordersQuantityForToday = action.payload.totalToday;
      state.ordersQuantityForAllTime = action.payload.total;
    },
    clearFeedOrders: (state) => {
      state.feedOrders = initialState.feedOrders;
      state.feedOrdersIsSuccess = initialState.feedOrdersIsSuccess;
      state.feedOrdersIsError = initialState.feedOrdersIsError;
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
    selectFeedOrders: (state) => state.feedOrders,
    selectUserOrders: (state) => state.userOrders,
    selectFeedOrdersIsSuccess: (state) => state.feedOrdersIsSuccess,
    selectOrdersQuantityForToday: (state) => state.ordersQuantityForToday,
    selectOrdersQuantityForAllTime: (state) => state.ordersQuantityForAllTime,
  },
});

export const {
  selectFeedOrders,
  selectOrderConfirmationName,
  selectOrderConfirmationNumber,
  selectUserOrders,
  selectFeedOrdersIsSuccess,
  selectOrdersQuantityForToday,
  selectOrdersQuantityForAllTime,
} = ordersSlice.selectors;

export const { getFeedOrders, clearFeedOrders, loadFeedOrders } =
  ordersSlice.actions;
export const selectOrderConfirmation = createSelector(
  [
    ordersSlice.selectors.selectOrderConfirmationNumber,
    ordersSlice.selectors.selectOrderConfirmationName,
  ],
  (number, name) => ({ number, name })
);
