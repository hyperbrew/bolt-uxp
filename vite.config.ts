import { defineConfig } from "vite";
import { runAction, uxp, uxpSetup } from "vite-uxp-plugin";
import { svelte } from "@sveltejs/vite-plugin-svelte"; // BOLT-UXP_SVELTE_ONLY
import { sveltePreprocess } from "svelte-preprocess/dist/autoProcess"; // BOLT-UXP_SVELTE_ONLY
import react from "@vitejs/plugin-react"; // BOLT-UXP_REACT_ONLY
import vue from "@vitejs/plugin-vue"; // BOLT-UXP_VUE_ONLY

import { config } from "./uxp.config";

const action = process.env.ACTION;
const mode = process.env.MODE;

if (action) {
  runAction({}, action);
  process.exit();
}

const shouldNotEmptyDir =
  mode === "dev" && config.manifest.requiredPermissions?.enableAddon;

export default defineConfig({
  plugins: [
    uxp(config, mode),
    react(), // BOLT-UXP_REACT_ONLY
    vue(), // BOLT-UXP_VUE_ONLY
    svelte({ preprocess: sveltePreprocess({ typescript: true }) }), // BOLT-UXP_SVELTE_ONLY
  ],
  build: {
    sourcemap: mode && ["dev", "build"].includes(mode) ? true : false,
    // minify: false,
    emptyOutDir: !shouldNotEmptyDir,
    rollupOptions: {
      external: [
        "photoshop", // BOLT-UXP_PHOTOSHOP_ONLY
        "indesign", // BOLT-UXP_INDESIGN_ONLY
        "premierepro", // BOLT-UXP_PREMIEREPRO_ONLY
        "illustrator", // BOLT-UXP_ILLUSTRATOR_ONLY
        "bolt-uxp-hybrid.uxpaddon", // BOLT-UXP_HYBRID_ONLY
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
