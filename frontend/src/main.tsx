import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import store from "./store";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/styles/bootstrap.custom.css";
import "./assets/styles/index.css";
import ThemeProvider from "./theme/ThemeProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
