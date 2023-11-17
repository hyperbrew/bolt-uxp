import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { runAction, uxp, uxpSetup } from "vite-uxp-plugin";
import { sveltePreprocess } from "svelte-preprocess/dist/autoProcess";
import react from "@vitejs/plugin-react"; // BOLT-CEP_REACT-ONLY
import vue from "@vitejs/plugin-vue"; // BOLT-CEP_VUE-ONLY

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
    react(), // BOLT-CEP_REACT-ONLY
    vue(), // BOLT-CEP_VUE-ONLY
    svelte({
      preprocess: sveltePreprocess({ typescript: true }),
    }),
  ],
  build: {
    rollupOptions: {
      external: ["uxp", "photoshop", "indesign"],
    },
  },
});
