<script setup lang="ts">
// BOLT_SAMPLECODE_START
import { ref, onMounted } from "vue";
import { uxp, indesign, photoshop, illustrator, premierepro } from "./globals";
import { api } from "./api/api";
import boltUxpLogo from "./assets/bolt-uxp.png";
import viteLogo from "./assets/vite.png";
import tsLogo from "./assets/typescript.png";
import sassLogo from "./assets/sass.png";
import vueLogo from "./assets/vue.png";
// BOLT_SAMPLECODE_END

const webviewUI = import.meta.env.VITE_BOLT_WEBVIEW_UI === "true";
const id = uxp.entrypoints._pluginInfo.id;

// BOLT_WEBVIEW_START
import { webviewInitHost } from "./webview-setup-host";
import type { WebviewAPI } from "../webview-ui/src/webview";

let webviewAPIs: WebviewAPI[];
let mainWebviewAPI: WebviewAPI;
onMounted(async () => {
  if (webviewUI) {
    webviewAPIs = await webviewInitHost({ multi: true });
    [mainWebviewAPI] = webviewAPIs;
    window.mainWebviewAPI = mainWebviewAPI;
    // [mainWebviewAPI, settingsWebviewAPI] = webviewAPIs; // for multi webviews
  }
});
// BOLT_WEBVIEW_END

// BOLT_SAMPLECODE_START
let count = ref(0);

const hostName = (uxp.host.name as string).toLowerCase();

//* Call Functions Conditionally by App
// BOLT_PHXS_START
if (hostName === "photoshop") {
  console.log("Hello from Photoshop", photoshop);
}
// BOLT_PHXS_END
// BOLT_IDSN_START
if (hostName === "indesign") {
  console.log("Hello from InDesign", indesign);
}
// BOLT_IDSN_END
// BOLT_PPRO_START
if (hostName === "premierepro") {
  console.log("Hello from Premiere Pro", premierepro);
}
// BOLT_PPRO_END
// BOLT_ILST_START
if (hostName === "illustrator") {
  console.log("Hello from Illustrator", illustrator);
}
// BOLT_ILST_END

//* Or call the unified API object directly and the correct app function will be used
const simpleAlert = () => {
  api.notify("Hello World");
};

// BOLT_HYBRID_START
const hybridTest = async () => {
  try {
    let hybridModule: {
      execSync: (cmd: string) => string;
    } = await require("bolt-uxp-hybrid.uxpaddon");
    let execSyncRes = hybridModule.execSync("echo test");
    console.log(`execSyncRes = `, execSyncRes);
    api.notify(`execSyncRes = ${execSyncRes}`);
  } catch (err) {
    console.log("Execute as execSync command failed", err);
  }
};
// BOLT_HYBRID_END
// BOLT_SAMPLECODE_END
</script>

<template>
  <main v-if="!webviewUI">
    <!-- BOLT_SAMPLECODE_START -->
    <div>
      <img class="logo-lg" :src="boltUxpLogo" alt="" />
    </div>
    <div class="stack-icons">
      <img :src="viteLogo" class="logo" alt="" />
      <span> + </span>
      <img :src="vueLogo" class="logo" alt="" />
      <span> + </span>
      <img :src="tsLogo" class="logo" alt="" />
      <span> + </span>
      <img :src="sassLogo" class="logo" alt="" />
    </div>
    <div class="button-group">
      <button @click="count++">count is {{ count }}</button>
      <button @click="simpleAlert">Alert</button>
      <!-- BOLT_HYBRID_START -->
      <button @click="hybridTest">Hybrid</button>
      <!-- BOLT_HYBRID_END -->
    </div>
    <div class="stack-colors">
      <div style="background-color: var(--uxp-host-background-color)"></div>
      <div style="background-color: var(--uxp-host-text-color)"></div>
      <div style="background-color: var(--uxp-host-border-color)"></div>
      <div style="background-color: var(--uxp-host-link-text-color)"></div>
      <div
        style="background-color: var(--uxp-host-widget-hover-background-color)"
      ></div>
      <div
        style="background-color: var(--uxp-host-widget-hover-text-color)"
      ></div>
      <div
        style="background-color: var(--uxp-host-widget-hover-border-color)"
      ></div>
      <div style="background-color: var(--uxp-host-text-color-secondary)"></div>
      <div
        style="background-color: var(--uxp-host-link-hover-text-color)"
      ></div>
      <div style="background-color: var(--uxp-host-label-text-color)"></div>
    </div>
    <div>
      <p>
        Edit <span class="code">main.vue</span> and save to test HMR updates.
      </p>
    </div>
    <div class="button-group">
      <a href="https://github.com/hyperbrew/bolt-uxp/">Bolt UXP Docs</a>
      <a href="https://v3.vuejs.org/">Vue Docs</a>
      <!-- <a href="https://vitejs.dev">Vite Docs</a> -->
    </div>
    <!-- BOLT_SAMPLECODE_END -->
  </main>

  <!-- BOLT_SAMPLECODE_START -->
  <!-- Example of a secondary panel entrypoint -->
  <!-- <uxp-panel :panelid="id + '.settings'">
    <h1>Settings Panel</h1>
    <p>count is: {{ count }}</p>
  </uxp-panel> -->
  <!-- BOLT_SAMPLECODE_END -->
</template>

<style lang="scss">
@use "./variables.scss" as *;
</style>
