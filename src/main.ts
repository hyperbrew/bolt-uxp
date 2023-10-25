import "./app.css";
import { uxp } from "./globals";
import App from "./main.svelte";

console.log("main.ts");

const ws = new WebSocket("ws://localhost:8080");
ws.onopen = () => console.log("Connected to the server");
ws.onclose = () => console.log("Disconnected from the server");
ws.onerror = (error) => console.error("WebSocket Error:", error);
ws.onmessage = (event) => {
  console.log("update is in");
  location.reload();
  // todo check status
  // const data = JSON.parse(event.data);
  // if (data.id === "com.id" && data.status === "updated") {
  //   console.log("Received update message from the server:", data);
  //   // Handle the message (e.g., update the UI or perform other actions)
  // }
};

uxp.entrypoints.setup({
  plugin: {
    create() {},
    destroy() {},
  },
  panels: {
    "bolt.uxp.plugin.panel": {
      create: () => {
        console.log("bolt.uxp.plugin.panel");
      },
      show: () => {},
      hide: () => {},
      destroy: () => {},
      invokeMenu: () => {},
      customEntrypoint: () => {},
      menuItems: [
        {
          id: "panel",
          label: "Main",
          enabled: true,
          checked: true,
          submenu: [],
        },
      ],
    },
    "bolt.uxp.plugin.settings": {
      create: (...params: any[]) => {
        console.log("bolt.uxp.plugin.settings");
      },
      show: () => {},
      hide: () => {},
      destroy: () => {},
      invokeMenu: () => {},
      customEntrypoint: () => {},
      menuItems: [
        {
          id: "settings",
          label: "Settings",
          enabled: true,
          checked: true,
          submenu: [],
        },
      ],
    },
  },
});

const app = new App({
  target: document.getElementById("app")!,
});

export default app;
