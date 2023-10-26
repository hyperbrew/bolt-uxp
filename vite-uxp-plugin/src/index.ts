import * as os from "os";
import { execSync } from "child_process";

import type { OutputChunk } from "rollup";
import type { Plugin } from "vite";

import type { UXP_Config, UXP_Manifest } from "./types";
import { hotReloadServer, wsUpdate } from "./hot-reload";
import { generateCCX } from "./cxx";
import { polyfills, wsListener } from "./polyfill";
export type { UXP_Config, UXP_Manifest };

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

export const uxp = (config: UXP_Config, mode?: string): Plugin => {
  return {
    name: "vite-uxp-plugin",
    buildStart() {
      uxpSetup(config, mode);
    },
    transform(code, id, options) {
      // console.log("id", id);
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
          console.log("file", file);
          if (mode === "dev" && file.indexOf("index") > 0) {
            console.log("Add WS Snippet");
            current.code = wsListener(config) + "\n" + current.code;
          }
        });
      //@ts-ignore
      this.emitFile(generateManifest(config));

      wsUpdate(config.manifest.id);
      return;
    },
    buildEnd() {
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
