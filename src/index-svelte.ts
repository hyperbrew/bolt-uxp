import "./app.css";
import App from "./main.svelte";
import "../src/index.scss";
import { mount } from "svelte";

console.clear(); // Clear logs on each reload

const start = () =>
  mount(App, {
    target: document.getElementById("app")!,
  });

if (typeof process !== "undefined" && process?.version?.includes("uxp")) {
  // UXP environment
  start();
} else {
  // Browser environment
  document.addEventListener("DOMContentLoaded", start);
}
