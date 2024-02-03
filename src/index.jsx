import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import App from "./components/app/app";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { store } from "./services/store"

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  //<React.StrictMode>
  <Provider store={store}>
    <HashRouter basename="/">
      <App />
    </HashRouter>
  </Provider>
  //</React.StrictMode>
);

reportWebVitals();
