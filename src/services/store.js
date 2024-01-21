import { applyMiddleware, compose, legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk";
import { ordersSocketAction } from "./actions/orders";
import { socketMiddleware } from "./middleware/socket-middleware";
import { rootReducer } from "./reducers";

const composeEnhancers = (typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})) || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(ordersSocketAction)));

export const store = createStore(rootReducer, enhancer);
