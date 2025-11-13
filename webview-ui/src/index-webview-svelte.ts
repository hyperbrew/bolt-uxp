import { mount } from "svelte";
import "./app.css";
import "./index.scss";
import App from "./main-webview.svelte";

mount(App, {
  target: document.getElementById("app")!,
});
