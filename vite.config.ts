import { defineConfig } from "vite";
import { runAction, uxp, uxpSetup } from "vite-uxp-plugin";
import { svelte } from "@sveltejs/vite-plugin-svelte"; // BOLT-UXP_SVELTE-ONLY
import { sveltePreprocess } from "svelte-preprocess/dist/autoProcess"; // BOLT-UXP_SVELTE-ONLY
import react from "@vitejs/plugin-react"; // BOLT-UXP_REACT-ONLY
import vue from "@vitejs/plugin-vue"; // BOLT-UXP_VUE-ONLY

import { config } from "./uxp.config";

const action = process.env.ACTION;
const mode = process.env.MODE;

if (action) {
  runAction({}, action);
  process.exit();
}

export default defineConfig({
  plugins: [
    uxp(config, mode),
    react(), // BOLT-UXP_REACT-ONLY
    vue(), // BOLT-UXP_VUE-ONLY
    svelte({ preprocess: sveltePreprocess({ typescript: true }) }), // BOLT-UXP_SVELTE-ONLY
  ],
  build: {
    rollupOptions: {
      external: ["uxp", "photoshop", "indesign"],
    },
  },
});
