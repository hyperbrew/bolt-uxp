import * as os from "os";
import { execSync } from "child_process";

import type { OutputChunk } from "rollup";
import type { Plugin } from "vite";

import type { UXP_Config, UXP_Manifest } from "./types";
import { hotReloadServer, wsUpdate } from "./hot-reload";
import { generateCCX } from "./cxx";
import { polyfills, wsListener } from "./polyfill";
import {
  copyFileSync,
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  statSync,
  unlinkSync,
} from "fs";
import path = require("path");
import { zipPackage } from "./zip";

import {
  packageSync,
  emptyFolder,
  copyFilesRecursively,
  // zipPackage,
} from "meta-bolt/dist/plugin-utils";
import { conColors, log, posix, resetLog } from "meta-bolt/dist/lib";

export type { UXP_Config, UXP_Manifest };

export const uxpSetup = (config: UXP_Config, mode?: string) => {
  if (mode === "dev") {
    hotReloadServer(config.hotReloadPort);
  }
};

const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));

const deleteExistingBinaries = (config: UXP_Config) => {
  try {
    const dist = path.join(process.cwd(), "dist");
    const win = path.join(dist, "win");
    const mac = path.join(dist, "mac");

    const win64 = path.join(win, "x64");
    const winArm64 = path.join(win, "arm64");
    const mac64 = path.join(mac, "x64");
    const macArm64 = path.join(mac, "arm64");

    let paths: string[] = [];
    [win64, winArm64, mac64, macArm64].map((dir) => {
      if (existsSync(dir) === false) return;
      readdirSync(dir).map((file) => {
        const fullPath = path.join(dir, file);
        paths.push(fullPath);
        unlinkSync(fullPath);
      });
    });
    console.log("Deleted Binaries: ", paths.join(", "));
  } catch (e) {
    console.warn(
      "UXP Hybrid Binaries were not updated. Ensure plugin is unloaded from UDT before rebuilding as binaries are locked during debug.",
    );
  }
};

const copyFileChanges = (src: string, dest: string) => {
  let copiedFiles: string[] = [];
  const srcFiles = readdirSync(src);
  srcFiles.map((file) => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    // if (existsSync(path.dirname(destPath)) === false) {
    //   mkdirSync(destPath, { recursive: true });
    // }
    const srcStat = statSync(srcPath);

    if (srcStat.isDirectory()) {
      if (existsSync(destPath) === false) {
        console.log("mkdir ::: ", destPath);
        mkdirSync(destPath, { recursive: true });
      }
      const res = copyFileChanges(srcPath, destPath);
      copiedFiles = [...copiedFiles, ...res];
    } else {
      const destStat = statSync(destPath);
      if (srcStat.size !== destStat.size) {
        copiedFiles.push(destPath);
        copyFileSync(srcPath, destPath);
      }
    }
  });
  return copiedFiles;
};

const copyHybridBinaries = (config: UXP_Config, onlyChanged: boolean) => {
  try {
    const dist = path.join(process.cwd(), "dist");
    const hybridPublic = path.join(process.cwd(), "public-hybrid");
    if (existsSync(hybridPublic) === false) return;

    if (onlyChanged) {
      const changedFiles = copyFileChanges(hybridPublic, dist);
      if (changedFiles.length > 0) {
        console.log(
          `copied ${changedFiles.length} changed binary files`,
          changedFiles,
        );
      }
    } else {
      readdirSync(hybridPublic).map((file) => {
        // console.log(
        //   "copy",
        //   path.join(hybridPublic, file),
        //   "TO",
        //   path.join(dist, file)
        // );
        cpSync(path.join(hybridPublic, file), path.join(dist, file), {
          recursive: true,
        });
      });
    }
  } catch (e) {
    console.error(e);
    console.warn(
      "⛔ WARNING: UXP Hybrid Binaries have changed, but could not be updated. " +
        "Ensure plugin is unloaded from UDT before rebuilding as binaries are locked during debug.",
    );
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
    // configResolved(resolvedConfig) {
    // if (mode === "dev" && config.manifest.addon) {
    //   deleteExistingBinaries(config);
    // }
    // },
    buildStart() {
      uxpSetup(config, mode);
      if (mode === "dev" && config.manifest.addon) {
        copyHybridBinaries(config, true);
      }
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
            // console.log("Add WS Snippet");
            current.code = wsListener(config) + "\n" + current.code;
          }
        });
      //@ts-ignore
      this.emitFile(generateManifest(config));

      wsUpdate(config.manifest.id);
      return;
    },
    async closeBundle() {
      if (mode !== "dev" && config.manifest.addon) {
        copyHybridBinaries(config, false);
      }
      if (mode === "package" || mode === "zip") {
        await generateCCX(config);
      }
      if (mode === "zip") {
        const zipDir = path.join(process.cwd(), "zip");
        const ccxDir = path.join(process.cwd(), "ccx");
        const src = process.cwd();
        await zipPackage(config, zipDir, ccxDir, src, config.copyZipAssets);
      }
    },
  };
};

const upiaMac =
  "/Library/Application Support/Adobe/Adobe Desktop Common/RemoteComponents/UPI/UnifiedPluginInstallerAgent/UnifiedPluginInstallerAgent.app/Contents/MacOS/UnifiedPluginInstallerAgent";
const upiaWin =
  "C:/Program Files/Common Files/Adobe/Adobe Desktop Common/RemoteComponents/UPI/UnifiedPluginInstallerAgent/UnifiedPluginInstallerAgent.exe";

const upiaPath = os.platform() === "darwin" ? upiaMac : upiaWin;

export const runAction = (config: UXP_Config, action: string) => {
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
  } else if (action === "dependencyCheck") {
    console.log("Checking Dependencies");
    packageSync();
  } else {
    console.warn(`Unknown Action: ${action}`);
  }
  resetLog();
  process.exit();
};
