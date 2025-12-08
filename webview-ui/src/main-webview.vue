<script setup lang="ts">
// BOLT_SAMPLECODE_START
import { ref } from "vue";
import boltUxpLogo from "../../src/assets/bolt-uxp.png";
import viteLogo from "../../src/assets/vite.png";
import tsLogo from "../../src/assets/typescript.png";
import sassLogo from "../../src/assets/sass.png";
import vueLogo from "../../src/assets/vue.png";

let count = ref(0);
// BOLT_SAMPLECODE_END

import * as webviewAPI from "./webview-api";
import { initWebview } from "./webview-setup";
const { api, page } = initWebview(webviewAPI);

const simpleAlert = async () => await api.notify("Hello World");

const getProjectInfo = async () => {
  const info = await api.getProjectInfo();
  const projectInfo = JSON.stringify(info, null, 2);
  console.log("Project Info:", { info });
  await api.notify(projectInfo);
};

const getUXPInfo = async () => {
  const info = await api.getUXPInfo();
  const uxpInfo = JSON.stringify(info, null, 2);
  console.log("Project Info:", { info });
  await api.notify(uxpInfo);
};

const clickLink = async (event: MouseEvent) => {
  event.preventDefault();
  const url = (event.target as HTMLAnchorElement).href;
  await api.openURL(url);
};
</script>

<template>
  <main>
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
      <button @click="getProjectInfo">Get Project Info</button>
      <button @click="getUXPInfo">Get UXP Info</button>
    </div>
    <div class="stack-colors">
      <div class="stack-colors-a"></div>
      <div class="stack-colors-b"></div>
      <div class="stack-colors-c"></div>
      <div class="stack-colors-d"></div>
      <div class="stack-colors-e"></div>
      <div class="stack-colors-f"></div>
      <div class="stack-colors-g"></div>
      <div class="stack-colors-h"></div>
      <div class="stack-colors-i"></div>
      <div class="stack-colors-j"></div>
    </div>
    <div>
      <p>
        Edit <span class="code">webview-ui/src/main-webview.vue</span> and save
        to test HMR updates.
      </p>
      <p>Webview page: {{ page }}</p>
    </div>
    <div class="button-group">
      <a href="https://github.com/hyperbrew/bolt-uxp/" @click="clickLink">
        Bolt UXP Docs
      </a>
      <a href="https://v3.vuejs.org/" @click="clickLink">Vue Docs</a>
      <a href="https://vitejs.dev/" @click="clickLink">Vite Docs</a>
    </div>
    <!-- BOLT_SAMPLECODE_END -->
  </main>
</template>

<style lang="scss">
@use "./variables.scss" as *;
</style>
