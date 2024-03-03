import { configureStore } from "@reduxjs/toolkit";
import { api } from "../api/api.ts";
import { socketMiddleware } from "../middleware/sockets.ts";
import { cartSlice } from "./cart.ts";
import { ingredientsSlice } from "./ingredients.ts";
import { ordersSlice } from "./orders.ts";
import { userSlice } from "./user.ts";
import { TSocketMiddlewareOptions } from "../../types/types.ts";

const feedOrdersSocketOptions: TSocketMiddlewareOptions = {
  connectActionType: "orders/getFeedOrders",
  disconnectActionType: "orders/clearFeedOrders",
  inboundMessageActionType: "orders/loadFeedOrders",
}

const userOrdersFeedSocketOptions: TSocketMiddlewareOptions = {
  connectActionType: "orders/getUserOrders",
  disconnectActionType: "orders/clearUserOrders",
  inboundMessageActionType: "orders/loadUsersOrders",
}

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    cart: cartSlice.reducer,
    ingredients: ingredientsSlice.reducer,
    user: userSlice.reducer,
    orders: ordersSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      api.middleware,
      socketMiddleware(feedOrdersSocketOptions),
      socketMiddleware(userOrdersFeedSocketOptions),
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
