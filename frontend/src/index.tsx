import React from "react";
import ReactDOM from "react-dom/client";
import Login from "./Components/Login/Login";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Routing from "./Components/Routing/Routing";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routing />
  </BrowserRouter>
);
