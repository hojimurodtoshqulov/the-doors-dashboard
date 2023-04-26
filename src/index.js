import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { BrowserRouter } from "react-router-dom";
import "./i18nextConf";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import AuthProvider from "./context/AuthProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>

  <BrowserRouter>
    <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
  </BrowserRouter>

  // </React.StrictMode>
);
