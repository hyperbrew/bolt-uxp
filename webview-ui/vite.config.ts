import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte"; // BOLT_SVELTE_ONLY
import react from "@vitejs/plugin-react"; // BOLT_REACT_ONLY
import vue from "@vitejs/plugin-vue"; // BOLT_VUE_ONLY
import { viteSingleFile } from "vite-plugin-singlefile";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), // BOLT_REACT_ONLY
    vue(), // BOLT_VUE_ONLY
    svelte(), // BOLT_SVELTE_ONLY
    viteSingleFile(),
  ],
  server: {
    port: 8081,
  },
  build: {
    outDir: "../public/webview-ui",
  },
});
