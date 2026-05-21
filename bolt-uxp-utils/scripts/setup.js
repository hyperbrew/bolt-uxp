#!/usr/bin/env node

/**
 * This script is only needed for vanilla UXP plugins - ones created
 * with the UXP Developer Tool or built without a bundler (e.g. Vite).
 *
 * It copies bolt-uxp-utils into plugin folder so the plugin can
 * require it via a relative path (UXP can't resolve npm package names).
 *
 * Run from your plugin folder: `npx bolt-uxp-utils setup`
 */
import { cpSync, existsSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const codes = {
  red: 31,
  green: 32,
  yellow: 33,
  cyan: 36,
};

const log = (...segments) => {
  const out = segments
    .map((seg) => {
      if (typeof seg === "string") return seg;
      const [style, text] = Object.entries(seg)[0];
      return `\x1b[${codes[style]}m${text}\x1b[0m`;
    })
    .join("");
  console.log(out);
};

const cmd = process.argv[2];
if (cmd !== "setup") {
  log(
    { red: "Incorrect command. Usage: " },
    { cyan: "npx bolt-uxp-utils setup" },
  );
  process.exit(cmd ? 1 : 0);
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const src = resolve(__dirname, "..", "dist", "cjs");
const dest = resolve(process.cwd(), "bolt-uxp-utils");

if (!existsSync(src)) {
  log({ red: "Could not find dist/cjs in the installed package." });
  process.exit(1);
}

mkdirSync(dest, { recursive: true });
cpSync(src, dest, { recursive: true });

log(
  { green: `Copied bolt-uxp-utils CommonJS files to ${dest}\n\n` },
  { cyan: "Use them in your plugin code:\n  " },
  { yellow: 'const { getActiveRoot } = require("./bolt-uxp-utils/ppro");\n  ' },
  { yellow: 'const { asModal } = require("./bolt-uxp-utils/ps");\n\n' },
  { cyan: "Or as a namespace:\n  " },
  { yellow: 'const bolt = require("./bolt-uxp-utils/ppro");\n  ' },
  { yellow: "await bolt.getActiveRoot();" },
);
