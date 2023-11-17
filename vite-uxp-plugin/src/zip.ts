import * as fs from "fs";
import * as path from "path";
import * as archiver from "archiver";

import { log, resetLog } from "./lib";
import { UXP_Config } from "./types";

const createZip = (src: string, dst: string, name: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const archive = archiver("zip");
    const zipDest = path.join(dst, `${name}.zip`);
    const output = fs.createWriteStream(zipDest);
    output.on("close", () => {
      resolve(zipDest);
    });
    archive.on("error", (err) => {
      reject(err.message);
    });
    archive.pipe(output);
    archive.directory(src, false);
    archive.finalize();
  });
};

export const zipPackage = async (
  config: UXP_Config,
  dest: string,
  ccx: string,
  src: string,
  assets?: string[]
) => {
  fs.mkdirSync(dest, { recursive: true });
  const tmpDir = path.join(dest, "tmp");
  // console.log({
  //   dest,
  //   ccx,
  //   src,
  //   assets,
  // });
  fs.mkdirSync(tmpDir, { recursive: true });
  fs.readdirSync(ccx).map((file) => {
    fs.cpSync(path.join(ccx, file), path.join(tmpDir, file), {
      recursive: true,
    });
  });

  if (assets) {
    assets.map((asset) => {
      if (asset.endsWith("/*")) {
        const assetPath = path.join(src, asset.replace("/*", ""));
        fs.readdirSync(assetPath).map((file) => {
          fs.cpSync(path.join(assetPath, file), path.join(tmpDir, file), {
            recursive: true,
          });
        });
      } else {
        fs.cpSync(path.join(src, asset), path.join(tmpDir, asset), {
          recursive: true,
        });
      }
    });
  }

  const zip = await createZip(
    tmpDir,
    dest,
    `${config.manifest.name}_${config.manifest.version}`
  );
  log("built zip", true, zip);
  fs.rmSync(tmpDir, { recursive: true });
  resetLog();
  return zip;
};
