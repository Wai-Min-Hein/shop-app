import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./Store/ConfigureStore.js";
import StateContextProvider from "./Context/Context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
        <Provider store={store}>
          <StateContextProvider>

          <App />
          </StateContextProvider>
        </Provider>
    </BrowserRouter>
    <ToastContainer />
  </React.StrictMode>
);
