import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import banner from "vite-plugin-banner";
import type { OutputChunk } from "rollup";
import type { Plugin } from "vite";

// import { mutationObserverPolyfill } from "./src/polyfill";
export const polyfills = `(function(){var t;null==window.MutationObserver&&(t=function(){function t(t){this.callBack=t}return t.prototype.observe=function(t,n){var e;return this.element=t,this.interval=setInterval((e=this,function(){var t;if((t=e.element.innerHTML)!==e.oldHtml)return e.oldHtml=t,e.callBack.apply(null)}),200)},t.prototype.disconnect=function(){return window.clearInterval(this.interval)},t}(),window.MutationObserver=t)}).call(this);`;

function viteUXPPlugin(): Plugin {
  return {
    name: "vite-uxp-plugin",
    generateBundle(output, bundle) {
      Object.keys(bundle)
        .filter((file) => file.indexOf(".js") > 0)
        .map((file) => {
          const current = bundle[file] as OutputChunk;
          current.code = polyfills + "\n" + current.code;
        });
    },
    transformIndexHtml(html) {
      return html.replace('<script type="module" crossorigin', "<script");
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [viteUXPPlugin(), svelte()],
});
