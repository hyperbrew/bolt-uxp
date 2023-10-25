import * as os from "os";
import * as http from "http";
import { execSync } from "child_process";
import { WebSocketServer, WebSocket } from "ws";
import type { OutputChunk } from "rollup";
import type { Plugin } from "vite";

import type { UXP_Config, UXP_Manifest } from "./types";
export type { UXP_Config, UXP_Manifest };

export const polyfills: string = `(function(){var t;null==window.MutationObserver&&(t=function(){function t(t){this.callBack=t}return t.prototype.observe=function(t,n){var e;return this.element=t,this.interval=setInterval((e=this,function(){var t;if((t=e.element.innerHTML)!==e.oldHtml)return e.oldHtml=t,e.callBack.apply(null)}),200)},t.prototype.disconnect=function(){return window.clearInterval(this.interval)},t}(),window.MutationObserver=t)}).call(this);`;

const clients: Set<WebSocket> = new Set();
const wsUpdate = (id: string) => {
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
const hotReloadServer = (hotReloadPort: number) => {
  const server = http.createServer((req, res) => {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  });
  const wss = new WebSocketServer({ server });
  wss.on("connection", (ws) => {
    console.log("Client connected");
    clients.add(ws);
    ws.on("message", (message) => console.log("Received:", message));
    ws.on("close", () => {
      clients.delete(ws);
    });
  });

  server.listen(hotReloadPort, () => {
    console.log(`Hot Reload ws server started on port ${hotReloadPort}`);
  });
};

export const uxpSetup = (config: UXP_Config) => {
  hotReloadServer(config.hotReloadPort);
};

const generateManifest = (config: UXP_Config) => {
  const str = JSON.stringify(config.manifest, null, "\t");
  return {
    type: "asset",
    source: str,
    name: "UXP Manifest",
    fileName: "manifest.json",
  };
};

export const uxp = (config: UXP_Config): Plugin => {
  return {
    name: "vite-uxp-plugin",
    generateBundle(output, bundle) {
      Object.keys(bundle)
        .filter((file) => file.indexOf(".js") > 0)
        .map((file) => {
          const current = bundle[file] as OutputChunk;
          current.code = polyfills + "\n" + current.code;
        });
      //@ts-ignore
      this.emitFile(generateManifest(config));

      console.log("bundle generated");

      wsUpdate(config.manifest.id);
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

  if (action === "ccx-install") {
    //* Install a CCX Plugin Package
    console.log("install");
    const res = execSync(`"${upiaPath}" /install "${outPath}"`, {
      encoding: "utf-8",
    });
    console.log("res", res);
    // makeSymlink(symlinkSrc, symlinkDst);
  } else if (action === "ccx-uninstall") {
    //* Uninstall a CCX Plugin Package
    // removeSymlink(symlinkSrc, symlinkDst);
    const res = execSync(`"${upiaPath}" /remove "${outPath}"`, {
      encoding: "utf-8",
    });
    console.log("res", res);
  } else if (action === "connect") {
  } else if (action === "disconnect") {
  } else if (action === "startdebug") {
    //* Start Debugging a development Plugin Package
  } else if (action === "stopdebug") {
    //* Stop Debugging a development Plugin Package
  } else {
    console.warn(`Unknown Action: ${action}`);
  }
  //   resetLog();
};
