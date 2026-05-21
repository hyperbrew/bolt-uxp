/**
 * Postbuild step: writes `{"type":"commonjs"}` into `dist/cjs/package.json`.
 *
 * The package root has `"type":"module"`, so without this marker Node
 * would treat the .js files in `dist/cjs/` as ESM and choke on
 * `require`/`module.exports`. The marker scopes those files back to
 * CommonJS just for that folder.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const cjsDir = resolve(__dirname, "..", "dist", "cjs");

mkdirSync(cjsDir, { recursive: true });
writeFileSync(
  resolve(cjsDir, "package.json"),
  JSON.stringify({ type: "commonjs" }, null, 2) + "\n",
);
