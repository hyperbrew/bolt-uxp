import { defineConfig } from "vite";
import { runAction, uxp, uxpSetup } from "vite-uxp-plugin";
import { svelte } from "@sveltejs/vite-plugin-svelte"; // BOLT_SVELTE_ONLY
import { sveltePreprocess } from "svelte-preprocess"; // BOLT_SVELTE_ONLY
import react from "@vitejs/plugin-react"; // BOLT_REACT_ONLY
import vue from "@vitejs/plugin-vue"; // BOLT_VUE_ONLY

import { config } from "./uxp.config";

const action = process.env.BOLT_ACTION;
const mode = process.env.MODE;
process.env.VITE_BOLT_MODE = mode;
// BOLT_WEBVIEW_START
process.env.VITE_BOLT_WEBVIEW_UI = (config.webviewUi === true).toString();
process.env.VITE_BOLT_WEBVIEW_PORT = config.webviewReloadPort.toString();
// BOLT_WEBVIEW_END

if (action) runAction(config, action);

const shouldNotEmptyDir =
  mode === "dev" && config.manifest.requiredPermissions?.enableAddon;

export default defineConfig({
  plugins: [
    uxp(config, mode),
    react(), // BOLT_REACT_ONLY
    vue(), // BOLT_VUE_ONLY
    svelte(), // BOLT_SVELTE_ONLY
  ],
  build: {
    sourcemap: mode && ["dev", "build"].includes(mode) ? true : false,
    minify: false,
    emptyOutDir: !shouldNotEmptyDir,
    rollupOptions: {
      external: [
        "photoshop", // BOLT_PHXS_ONLY
        "indesign", // BOLT_IDSN_ONLY
        "premierepro", // BOLT_PPRO_ONLY
        "illustrator", // BOLT_ILST_ONLY
        "bolt-uxp-hybrid.uxpaddon", // BOLT_HYBRID_ONLY
        "uxp",
        "fs",
        "os",
        "path",
        "process",
        "shell",
      ],
      output: {
        format: "cjs",
      },
    },
  },
  publicDir: "public",
});
