//External modules
import React from "react";
import ReactDOM from "react-dom/client";
import { GlobalStyle } from "./styles/styles";

//Internal modules
import App from "./App.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div>
    <GlobalStyle />
    <App />
  </div>,
);
