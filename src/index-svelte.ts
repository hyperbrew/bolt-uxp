import "./app.css";
import App from "./main.svelte";
import "./index.scss";

console.clear(); // Clear logs on each reload

const app = new App({
  target: document.getElementById("app")!,
});

export default app;
