import "./app.css";
import App from "./main.svelte";

const app = new App({
  target: document.getElementById("app")!,
});

export default app;
