import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { runAction, uxp, uxpSetup } from "./vite-uxp-plugin/index";
import { sveltePreprocess } from "svelte-preprocess/dist/autoProcess";

import { config } from "./uxp.config";

const action = process.env.ACTION;

if (action) {
  runAction({}, action);
  process.exit();
}

uxpSetup(config);

export default defineConfig({
  plugins: [
    uxp(config),
    svelte({
      preprocess: sveltePreprocess({ typescript: true }),
    }),
  ],
  build: {
    rollupOptions: {
      external: ["uxp", "photoshop"],
    },
  },
});
