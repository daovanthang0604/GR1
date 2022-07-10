import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import store and provider
import { store } from "./store";
import { Provider } from "react-redux";
//material ui
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <App />
      </MuiPickersUtilsProvider>
    </Provider>
  </React.StrictMode>
);
