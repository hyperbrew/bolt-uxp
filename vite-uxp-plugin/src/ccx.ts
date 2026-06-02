import * as fs from "fs";
import * as path from "path";
import * as archiver from "archiver";

import type { UXP_Config, UXP_Manifest } from "./types";
export type { UXP_Config, UXP_Manifest };

const deepClone = <T extends object>(a: T): T => {
  return JSON.parse(JSON.stringify(a));
};

export const generateCCX = async (config: UXP_Config) => {
  fs.mkdirSync("ccx", { recursive: true });
  const createZip = (src: string, dst: string, name: string) => {
    return new Promise((resolve, reject) => {
      const archive = archiver("zip", { zlib: { level: 9 } });
      const zipDest = path.join(dst, name);
      const output = fs.createWriteStream(zipDest);
      output.on("close", () => {
        console.log(`> ${zipDest} ( ${archive.pointer()} bytes )`);
        resolve(zipDest);
      });
      archive.on("error", (err) => reject(err.message));
      archive.pipe(output);
      archive.directory(src, false);
      archive.finalize();
    });
  };
  const originalManifest = JSON.stringify(config.manifest, null, "\t");
  console.log(
    `Generating ${config.manifest.host.length} CCX Archive(s) for UXP Panel`,
  );
  // Split up CCX for each host app and append appID to id to have a unique id
  const id = config.manifest.id;
  try {
    let uniqueId = id;
    let uniqueEntryPoints = deepClone(config.manifest.entrypoints);
    for (let host of config.manifest.host) {
      if (config.uniqueIds === false) {
        // opt-in old behavior to not require an uninstall for existing installs if UXP panel only has 1 host app
        if (config.manifest.host.length > 1) {
          console.warn(
            "⚠️ UniqueIds set to false. Install conflicts can occur if installing for multiple host apps.",
          );
        }
      } else {
        uniqueId = `${id}_${host.app.toLowerCase()}`;
        uniqueEntryPoints = deepClone(config.manifest.entrypoints).map(
          (point) => {
            return {
              ...point,
              id: point.id.replace(id, uniqueId),
            };
          },
        );
      }
      const currentManifest = JSON.stringify(
        {
          ...config.manifest,
          id: uniqueId,
          host,
          entrypoints: uniqueEntryPoints,
        },
        null,
        "\t",
      );
      fs.writeFileSync(path.join("dist", "manifest.json"), currentManifest);
      await createZip("dist", "ccx", `${config.manifest.id}_${host.app}.ccx`);
    }
  } catch (error) {
    console.error(error);
  }
  //* Restore original manifest in dist
  fs.writeFileSync(path.join("dist", "manifest.json"), originalManifest);
};
