import { mount } from "svelte";
import "./app.css";
import App from "./webview-main.svelte";

mount(App, {
  target: document.getElementById("app")!,
});
