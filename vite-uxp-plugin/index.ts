import os from "os";
import { execSync } from "child_process";

import type { OutputChunk } from "rollup";
import type { Plugin } from "vite";

export const polyfills = `(function(){var t;null==window.MutationObserver&&(t=function(){function t(t){this.callBack=t}return t.prototype.observe=function(t,n){var e;return this.element=t,this.interval=setInterval((e=this,function(){var t;if((t=e.element.innerHTML)!==e.oldHtml)return e.oldHtml=t,e.callBack.apply(null)}),200)},t.prototype.disconnect=function(){return window.clearInterval(this.interval)},t}(),window.MutationObserver=t)}).call(this);`;

// ws server
// ws server
// ws server
// ws server
// ws server
// ws server
// ws server

import http from "http";
import express from "express";
import { WebSocketServer, WebSocket } from "ws";
const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// Store all connected clients
const clients: Set<WebSocket> = new Set();

wss.on("connection", (ws) => {
  console.log("Client connected");
  clients.add(ws);
  ws.on("message", (message) => console.log("Received:", message));
  ws.on("close", () => {
    console.log("Client disconnected"), clients.delete(ws);
  });
});

server.listen(8080, () => {
  console.log("Server started on http://localhost:8080");
});

function wsUpdate() {
  console.log("Broadcasting!");
  console.log("\n");
  console.log({ clients });
  console.log("\n");
  for (let client of clients) {
    // if (client.readyState === WebSocket.OPEN) {
    client.send("com.id", {
      status: "updated",
    });
    // }
  }
}

// ws server
// ws server
// ws server
// ws server
// ws server
// ws server
// ws server

export const uxp = (): Plugin => {
  return {
    name: "vite-uxp-plugin",
    generateBundle(output, bundle) {
      Object.keys(bundle)
        .filter((file) => file.indexOf(".js") > 0)
        .map((file) => {
          const current = bundle[file] as OutputChunk;
          current.code = polyfills + "\n" + current.code;
        });
      console.log("bundle generated");

      // Define an endpoint to broadcast the message to all clients
      wsUpdate();

      // TODO send websocket message
    },
    transformIndexHtml(html) {
      return html.replace('<script type="module" crossorigin', "<script");
    },
  };
};

const upiaMac =
  "/Library/Application Support/Adobe/Adobe Desktop Common/RemoteComponents/UPI/UnifiedPluginInstallerAgent/UnifiedPluginInstallerAgent.app/Contents/MacOS/UnifiedPluginInstallerAgent";
const upiaWin =
  "C:/Program Files/Common Files/Adobe/Adobe Desktop Common/RemoteComponents/UPI/UnifiedPluginInstallerAgent/UnifiedPluginInstallerAgent.exe";

const upiaPath = os.platform() === "darwin" ? upiaMac : upiaWin;

export const runAction = (opts: object, action: string) => {
  const outPath = process.cwd() + "/dist";
  console.log("outPath", outPath);

  if (action === "install") {
    //* Install a CCX Plugin Package
    console.log("install");
    const res = execSync(`"${upiaPath}" /install "${outPath}"`, {
      encoding: "utf-8",
    });
    console.log("res", res);
    // makeSymlink(symlinkSrc, symlinkDst);
  } else if (action === "uninstall") {
    //* Uninstall a CCX Plugin Package
    // removeSymlink(symlinkSrc, symlinkDst);
    const res = execSync(`"${upiaPath}" /remove "${outPath}"`, {
      encoding: "utf-8",
    });
    console.log("res", res);
  } else if (action === "startdebug") {
    //* Start Debugging a development Plugin Package
  } else if (action === "stopdebug") {
    //* Stop Debugging a development Plugin Package
  } else {
    console.warn(`Unknown Action: ${action}`);
  }
  //   resetLog();
};
