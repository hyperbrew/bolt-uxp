import * as http from "http";
import { WebSocketServer, WebSocket } from "ws";

import type { UXP_Config, UXP_Manifest } from "./types";
export type { UXP_Config, UXP_Manifest };

let clients: Set<WebSocket> = new Set();
let server: http.Server | null = null;

export const wsUpdate = (id: string) => {
  console.log(`\n⚡ Trigger hot reload (for ${clients.size} clients)`);
  const message = JSON.stringify({
    id: id,
    status: "updated",
  });
  for (let client of clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  }
};

export const hotReloadServer = (hotReloadPort: number) => {
  if (server) return;
  server = http.createServer((req, res) => {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  });
  const wss = new WebSocketServer({ server });
  wss.on("connection", (ws) => {
    clients.add(ws);
    ws.on("message", (message) => console.log("Received:", message));
    ws.on("close", () => {
      clients.delete(ws);
    });
  });

  server.listen(hotReloadPort, () => {
    console.log(`⚡ Hot reload ws server started on port ${hotReloadPort}`);
  });
};
