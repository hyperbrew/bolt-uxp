import * as os from "os";
import * as http from "http";
import * as fs from "fs";
import * as path from "path";
import { execSync } from "child_process";
import { WebSocketServer, WebSocket } from "ws";
import * as archiver from "archiver";
import * as yazl from "yazl";

import type { OutputChunk } from "rollup";
import type { Plugin } from "vite";

import type { UXP_Config, UXP_Manifest } from "./types";
export type { UXP_Config, UXP_Manifest };

export const polyfills: string = `(function(){var t;null==window.MutationObserver&&(t=function(){function t(t){this.callBack=t}return t.prototype.observe=function(t,n){var e;return this.element=t,this.interval=setInterval((e=this,function(){var t;if((t=e.element.innerHTML)!==e.oldHtml)return e.oldHtml=t,e.callBack.apply(null)}),200)},t.prototype.disconnect=function(){return window.clearInterval(this.interval)},t}(),window.MutationObserver=t)}).call(this);`;

let clients: Set<WebSocket> = new Set();
let server: http.Server | null = null;
const wsUpdate = (id: string) => {
  console.log(`\n⚡ Trigger Hot Reload (for ${clients.size} clients)`);
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
    console.log(`⚡ Hot Reload ws server started on port ${hotReloadPort}`);
  });
};

export const uxpSetup = (config: UXP_Config, mode?: string) => {
  if (mode === "dev") {
    hotReloadServer(config.hotReloadPort);
  }
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

function setPermissionsRecursively(dirPath: string) {
  const items = fs.readdirSync(dirPath);

  items.forEach((item) => {
    const fullPath = path.join(dirPath, item);

    if (fs.statSync(fullPath).isDirectory()) {
      setPermissionsRecursively(fullPath);
    } else {
      console.log("change permission for file: " + fullPath);
      fs.chmodSync(fullPath, 0o644);
    }
  });
}

const generateCCX = async (config: UXP_Config) => {
  // TODO: Split up CCX for each app making the host array an object
  // TODO: Thus multi-host UXP panels have multiple CCX files to use for install

  const createZip = (src: string, dst: string, name: string) => {
    // setPermissionsRecursively(src);
    // function addDirectoryToZip(
    //   zipfile: any,
    //   dir: string,
    //   zipPath: string = ""
    // ) {
    //   const items = fs.readdirSync(dir);
    //   for (const item of items) {
    //     const fullPath = path.join(dir, item);
    //     const relPath = zipPath ? path.join(zipPath, item) : item;

    //     if (fs.statSync(fullPath).isDirectory()) {
    //       addDirectoryToZip(zipfile, fullPath, relPath);
    //     } else {
    //       // For files:
    //       // Mode 0644 translates to -rw-r--r-- for UNIX-like permissions
    //       console.log("file time");
    //       zipfile.addFile(fullPath, relPath, { mode: 0o644 });
    //     }
    //   }
    // }

    // const zipfile = new yazl.ZipFile();

    // addDirectoryToZip(zipfile, src);

    // zipfile.outputStream
    //   .pipe(fs.createWriteStream(path.join(dst, name)))
    //   .on("close", () => {
    //     console.log("ZIP file created.");
    //   });
    // zipfile.end();

    return new Promise((resolve, reject) => {
      const archive = archiver("zip", {
        zlib: { level: 9 }, // Sets the compression level.
      });
      const zipDest = path.join(dst, name);
      const output = fs.createWriteStream(zipDest);
      output.on("close", () => {
        console.log(`zip archive created. ( ${archive.pointer()} bytes )`);
        resolve(zipDest);
      });
      archive.on("error", (err) => reject(err.message));
      archive.pipe(output);
      // archive.directory(src, false);

      // Add directory with custom permissions for all files
      archive.directory(
        src,
        false
        //   {
        //   set: (entryData) => {
        //     if (entryData.type === "file") {
        //       entryData.mode = 0o644;
        //     } else if (entryData.type === "directory") {
        //       delete entryData.mode; // Ensures directories don't have a mode set
        //     }
        //     return entryData;
        //   },
        // }
      );
      archive.finalize();
    });
  };
  const originalManifest = JSON.stringify(config.manifest, null, "\t");
  for (let host of config.manifest.host) {
    const currentManifest = JSON.stringify(
      { ...config.manifest, host },
      null,
      "\t"
    );
    fs.writeFileSync(path.join("dist", "manifest.json"), currentManifest);
    await createZip("dist", "ccx", `${config.manifest.id}_${host.app}.ccx`);
  }
  // restore original manifest
  fs.writeFileSync(path.join("dist", "manifest.json"), originalManifest);
};

export const uxp = (config: UXP_Config, mode?: string): Plugin => {
  return {
    name: "vite-uxp-plugin",
    buildStart() {
      uxpSetup(config, mode);
    },
    transformIndexHtml(html) {
      return html.replace('<script type="module" crossorigin', "<script");
    },
    generateBundle(output, bundle) {
      Object.keys(bundle)
        .filter((file) => file.indexOf(".js") > 0)
        .map((file) => {
          const current = bundle[file] as OutputChunk;
          current.code = polyfills + "\n" + current.code;
        });
      //@ts-ignore
      this.emitFile(generateManifest(config));

      wsUpdate(config.manifest.id);
      return;
    },
    buildEnd(ar) {
      console.log("AR", ar);
      if (mode === "package") {
        setTimeout(() => {
          generateCCX(config);
        }, 1000);
      }
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
