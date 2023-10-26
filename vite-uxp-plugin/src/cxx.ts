import * as fs from "fs";
import * as path from "path";
import * as archiver from "archiver";

import type { UXP_Config, UXP_Manifest } from "./types";
export type { UXP_Config, UXP_Manifest };

export const generateCCX = async (config: UXP_Config) => {
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
    `Generating ${config.manifest.host.length} CCX Archive(s) for UXP Panel`
  );
  // TODO: Split up CCX for each host app
  try {
    for (let host of config.manifest.host) {
      const currentManifest = JSON.stringify(
        { ...config.manifest, host },
        null,
        "\t"
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
