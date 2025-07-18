<script setup lang="ts">
// BOLT_SAMPLECODE_START
import { ref } from "vue";

let count = ref(0);
  import * as webviewAPI from "./webview-api";

  import { initWebview } from "./webview-setup";
  const api = initWebview(webviewAPI);

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


// BOLT_SAMPLECODE_END
</script>

<template>
  <main>
    <!-- BOLT_SAMPLECODE_START -->
    <div>
      <img class="logo-lg" src="../../src/assets/bolt-uxp.png" alt="" />
    </div>
    <div class="stack-icons">
      <img src="../../src/assets/vite.png" class="logo" alt="" />
      <span> + </span>
      <img src="../../src/assets/vue.png" class="logo" alt="" />
      <!-- <span> + </span> -->
      <!-- <img src="./assets/vite.png" class="logo" alt="" />
      <span> + </span>
      <img src="./assets/sass.png" class="logo" alt="" /> -->
    </div>
    <div class="button-group">
      <button @click="count++">count is {{ count }}</button>
      <button @click="simpleAlert">Alert</button>
      <button @click="getProjectInfo">Get Project Info</button>
      <button @click="getUXPInfo">Get UXP Info</button>
    </div>
    <div>
      <p>
        Edit <span class="code">main.vue</span> and save to test HMR updates.
      </p>
    </div>
    <div class="button-group">
      <a href="https://github.com/hyperbrew/bolt-uxp/">Bolt UXP Docs</a>
      <a href="https://v3.vuejs.org/">Vue Docs</a>
    </div>
    <!-- BOLT_SAMPLECODE_END -->
  </main>

</template>

<style lang="scss">
@use "./variables.scss" as *;
</style>
