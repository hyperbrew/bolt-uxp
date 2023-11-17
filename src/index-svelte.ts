import "./app.css";
import App from "./main.svelte";
import "./index.scss";

const app = new App({
  target: document.getElementById("app")!,
});

export default app;
