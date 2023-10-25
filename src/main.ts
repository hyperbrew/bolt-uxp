import "./app.css";
import App from "./main.svelte";
import { config } from "../uxp.config";

const listenForHotReload = () => {
  const reconnect = (reason: string) => {
    console.log(
      `Disconnected from hot reload server (${reason}). Attempting to reconnect in 3 seconds...`
    );
    setTimeout(listenForHotReload, 3000);
  };
  const ws = new WebSocket(`ws://localhost:${config.hotReloadPort}`);
  ws.onclose = () => reconnect("closed");
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.id === config.manifest.id && data.status === "updated") {
      console.log("⚡hot reloading⚡");
      location.reload();
    }
  };
};
listenForHotReload();

const app = new App({
  target: document.getElementById("app")!,
});

export default app;
