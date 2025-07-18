import React from "react";
import ReactDOM from "react-dom/client";
import "./app.css";
import "./index.scss";
import { App } from "./main-webview";

ReactDOM.createRoot(document.getElementById("app") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
