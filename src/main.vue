<script setup lang="ts">
// BOLT_SAMPLECODE_START
import { ref } from "vue";
import { uxp, indesign, photoshop } from "./globals";
import { api } from "./api/api";

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
  console.log("Hello from Premiere Pro", indesign);
}
// BOLT_PPRO_END
// BOLT_ILST_START
if (hostName === "illustrator") {
  console.log("Hello from Illustrator", indesign);
}
// BOLT_ILST_END

//* Or call the unified API object directly and the correct app function will be used
const helloWorld = () => {
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
  <main>
    <!-- BOLT_SAMPLECODE_START -->
    <div>
      <img class="logo-lg" src="./assets/bolt-uxp.png" alt="" />
    </div>
    <div class="stack-icons">
      <img src="./assets/vite.png" class="logo" alt="" />
      <span> + </span>
      <img src="./assets/vue.png" class="logo" alt="" />
      <!-- <span> + </span> -->
      <!-- <img src="./assets/vite.png" class="logo" alt="" />
      <span> + </span>
      <img src="./assets/sass.png" class="logo" alt="" /> -->
    </div>
    <div class="button-group">
      <button @click="count++">count is {{ count }}</button>
      <button @click="helloWorld">Hello World</button>
      <!-- BOLT_HYBRID_START -->
      <button @click="hybridTest">Hybrid</button>
      <!-- BOLT_HYBRID_END -->
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
  <!-- <uxp-panel panelid="bolt.uxp.plugin.settings">
    <h1>Settings Panel</h1>
    <p>count is: {{ count }}</p>
  </uxp-panel> -->
  <!-- BOLT_SAMPLECODE_END -->
</template>

<style lang="scss">
@use "./variables.scss" as *;
</style>
