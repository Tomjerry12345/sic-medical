import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import RoutersConfig from "./config/RoutersConfig";
import { Provider } from "react-redux";
import ReduxConfig from "./config/ReduxConfig";
import { ContextProvider } from "./services/Context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <Provider store={ReduxConfig()}> */}
    <ContextProvider>
      <RoutersConfig />
    </ContextProvider>
    {/* </Provider> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
