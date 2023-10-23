import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
// @ts-ignore
import { runAction, uxp } from "./vite-uxp-plugin/index";

const action = process.env.ACTION;

if (action) {
  runAction({}, action);
  process.exit();
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uxp(), svelte()],
  // externals
  build: {
    rollupOptions: {
      external: ["uxp", "photoshop"],
    },
  },
});
