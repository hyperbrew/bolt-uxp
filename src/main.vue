<script setup lang="ts">
// BOLT-UXP_SAMPLECODE_START
import { ref } from "vue";
import { uxp, indesign, photoshop } from "./globals";
import { api } from "./api/api";

let count = ref(0);

const hostName = (uxp.host.name as string).toLowerCase();

//* Call Functions Conditionally by App
// BOLT-UXP_PHOTOSHOP_START
if (hostName === "photoshop") {
  console.log("Hello from Photoshop", photoshop);
}
// BOLT-UXP_PHOTOSHOP_END
// BOLT-UXP_INDESIGN_START
if (hostName === "indesign") {
  console.log("Hello from InDesign", indesign);
}
// BOLT-UXP_INDESIGN_END
// BOLT-UXP_PREMIEREPRO_START
if (hostName === "premierepro") {
  console.log("Hello from Premiere Pro", indesign);
}
// BOLT-UXP_PREMIEREPRO_END
// BOLT-UXP_ILLUSTRATOR_START
if (hostName === "illustrator") {
  console.log("Hello from Illustrator", indesign);
}
// BOLT-UXP_ILLUSTRATOR_END

//* Or call the unified API object directly and the correct app function will be used
const helloWorld = () => {
  api.notify("Hello World");
};

// BOLT-UXP_HYBRID_START
const hybridTest = async () => {
  try {
    const addon = await require("bolt-uxp-hybrid.uxpaddon");
    const myFunctionResult = addon.my_function();
    console.log(`myFunctionResult = `, myFunctionResult);
    api.notify(`myFunctionResult = ${myFunctionResult}`);
  } catch (err) {
    console.log("Execute as testMyFunction command failed", err);
  }
};
// BOLT-UXP_HYBRID_END
// BOLT-UXP_SAMPLECODE_END
</script>

<template>
  <main>
    <!-- BOLT-UXP_SAMPLECODE_START -->
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
      <!-- BOLT-UXP_HYBRID_START -->
      <button @click="hybridTest">Hybrid</button>
      <!-- BOLT-UXP_HYBRID_END -->
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
    <!-- BOLT-UXP_SAMPLECODE_END -->
  </main>

  <!-- BOLT-UXP_SAMPLECODE_START -->
  <!-- Example of a secondary panel entrypoint -->
  <!-- <uxp-panel panelid="bolt.uxp.plugin.settings">
  <h1>Settings Panel</h1><p>count is: {{count}}</p>
</uxp-panel> -->
  <!-- BOLT-UXP_SAMPLECODE_END -->
</template>

<style lang="scss">
@import "./variables.scss";
</style>
