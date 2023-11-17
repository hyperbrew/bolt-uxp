<script setup lang="ts">
import { onMounted, ref } from "vue";
import { uxp, indesign, photoshop } from "./globals";
const { openExternal } = uxp.shell;
import { api } from "./api/api";

let count: number = 0;
const increment = () => (count += 1);

console.log("Welcome to Bolt UXP inside of: ", uxp.host.name);

//* Call Functions Conditionally by App
if (uxp.host.name === "Photoshop") {
  console.log("Hello from Photoshop", photoshop);
}
if (uxp.host.name === "InDesign") {
  console.log("Hello from InDesign", indesign);
}

//* Or call the unified API object directly and the correct app function will be used
const helloWorld = () => {
  api.notify("Hello World");
};

const hybridTest = async () => {
  try {
    const addon = await require("sample-uxp-addon.uxpaddon");
    const myFunctionResult = addon.my_function();
    console.log(`myFunctionResult = `, myFunctionResult);
    api.notify(`myFunctionResult = ${myFunctionResult}`);
  } catch (err) {
    console.log("Execute as testMyFunction command failed", err);
  }
};
</script>

<template>
  <main>
    <div>
      <img class="logo-lg" src="./assets/bolt-uxp.png" alt="" />
    </div>
    <div class="stack-icons">
      <img src="./assets/vite.png" class="logo" alt="" />
      <span> + </span>
      <img src="./assets/vue.png" class="logo" alt="" />
      <span> + </span>
      <!-- <img src="./assets/vite.png" class="logo" alt="" />
      <span> + </span>
      <img src="./assets/sass.png" class="logo" alt="" /> -->
    </div>
    <div class="button-group">
      <button @click="increment">count is {{ count }}</button>
      <button @click="helloWorld">Hello World</button>
      <button @click="hybridTest">Hybrid</button>
    </div>
    <div>
      <p>
        Edit <span class="code">main.svelte</span> and save to test HMR updates.
      </p>
    </div>
    <div class="button-group">
      <a href="https://github.com/hyperbrew/bolt-uxp/">Bolt UXP Docs</a>
      <a href="https://v3.vuejs.org/">Vue Docs</a>
      <!-- <a href="https://vitejs.dev">Vite Docs</a> -->
    </div>
  </main>

  <!-- Example of a secondary panel entrypoint -->
  <!-- <uxp-panel panelid="bolt.uxp.plugin.settings">
  <h1>Settings Panel</h1><p>count is: {{count}}</p>
</uxp-panel> -->
</template>

<style lang="scss">
@import "./variables.scss";
</style>
