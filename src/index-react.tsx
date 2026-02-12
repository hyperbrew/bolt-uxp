import "./app.css";
import "./index.scss";
import React from "react";
import ReactDOM from "react-dom/client";

import { App } from "./main";
import { initUXP } from "./api/uxp";

console.clear(); // Clear logs on each reload

ReactDOM.createRoot(document.getElementById("app") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
initUXP();
