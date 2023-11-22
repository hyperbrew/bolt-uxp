import { defineConfig } from "vite";
import { runAction, uxp, uxpSetup } from "vite-uxp-plugin";
// BOLT-UXP_SVELTE_START
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { sveltePreprocess } from "svelte-preprocess/dist/autoProcess";
// BOLT-UXP_SVELTE_END
// BOLT-UXP_REACT_START
import react from "@vitejs/plugin-react";
// BOLT-UXP_REACT_END
// BOLT-UXP_VUE_START
import vue from "@vitejs/plugin-vue";
// BOLT-UXP_VUE_END

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
    // BOLT-UXP_REACT_START
    react(),
    // BOLT-UXP_REACT_END
    // BOLT-UXP_VUE_START
    vue(),
    // BOLT-UXP_VUE_END
    // BOLT-UXP_SVELTE_START
    svelte({ preprocess: sveltePreprocess({ typescript: true }) }),
    // BOLT-UXP_SVELTE_END
  ],
  build: {
    emptyOutDir: !shouldNotEmptyDir,
    rollupOptions: {
      external: ["uxp", "photoshop", "indesign"],
    },
  },
  publicDir: "public",
});
