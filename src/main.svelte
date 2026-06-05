<script lang="ts">
  // BOLT_SAMPLECODE_START
  import {
    uxp,
    indesign,
    photoshop,
    premierepro,
    illustrator,
  } from "./globals";
  import { api } from "./api/api";
  import boltUxpLogo from "./assets/bolt-uxp.png";
  import viteLogo from "./assets/vite.png";
  import tsLogo from "./assets/typescript.png";
  import sassLogo from "./assets/sass.png";
  import svelteLogo from "./assets/svelte.png";
  import { onMount } from "svelte";
  const id = uxp.entrypoints._pluginInfo.id;

  const webviewUI = import.meta.env.VITE_BOLT_WEBVIEW_UI === "true";
  // BOLT_WEBVIEW_START
  import { webviewInitHost } from "./webview-setup-host";
  import type { WebviewAPI } from "../webview-ui/src/webview";
  import { getColorScheme } from "./api/uxp";
  let webviewAPIs: WebviewAPI[];
  let mainWebviewAPI: WebviewAPI;
  if (webviewUI) {
    onMount(async () => {
      webviewAPIs = await webviewInitHost({ multi: true });
      [mainWebviewAPI] = webviewAPIs;
      window.mainWebviewAPI = mainWebviewAPI;
      // [mainWebviewAPI, settingsWebviewAPI] = webviewAPIs; // for multi webviews
    });
  }
  // BOLT_WEBVIEW_END

  let count: number = $state(0);
  const increment = () => (count += 1);
  const hostName = (uxp?.host?.name || ("" as string)).toLowerCase();

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
        execAsync: (cmd: string) => Promise<string>;
        exec: (cmd: string) => Promise<string>;
      } = await require("bolt-uxp-hybrid.uxpaddon");
      // let execSyncRes = hybridModule.execSync("echo test");
      // console.log(`execSyncRes = `, execSyncRes);
      // api.notify(`execSyncRes = ${execSyncRes}`);

      // console.log("testing execAsync");
      // const res = await hybridModule.execAsync("sleep 5 && echo done");
      // console.log(res);
      let i = 0;
      while (i < 50) {
        i++;
        try {
          console.log(`testing exec #${i}`);
          const res3 = await hybridModule.exec("sleep .5 && echo done");
          console.log(res3);
        } catch (error) {
          break;
        }
      }
    } catch (err) {
      console.log("Execute as execSync command failed", err);
    }
  };
  // BOLT_HYBRID_END
  // BOLT_SAMPLECODE_END
</script>

{#if !webviewUI}
  <main>
    <!-- BOLT_SAMPLECODE_START -->
    <div>
      <img class="logo-lg" src={boltUxpLogo} alt="" />
    </div>
    <div class="stack-icons">
      <img src={viteLogo} class="logo" alt="" />
      <span> + </span>
      <img src={svelteLogo} class="logo" alt="" />
      <span> + </span>
      <img src={tsLogo} class="logo" alt="" />
      <span> + </span>
      <img src={sassLogo} class="logo" alt="" />
    </div>
    <div class="button-group">
      <button onclick={increment}>
        count is {count}
      </button>
      <button onclick={simpleAlert}>Alert</button>
      <!-- BOLT_HYBRID_START -->
      <button onclick={hybridTest}>Hybrid</button>
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
        style="background-color: var(--uxp-host-widget-hover-border-color);"
      ></div>
      <div style="background-color: var(--uxp-host-text-color-secondary)"></div>
      <div
        style="background-color: var(--uxp-host-link-hover-text-color)"
      ></div>
      <div style="background-color: var(--uxp-host-label-text-color)"></div>
    </div>
    <div>
      <p>
        Edit <span class="code">main.svelte</span> and save to test HMR updates.
      </p>
    </div>
    <div class="button-group">
      <a href="https://github.com/hyperbrew/bolt-uxp/">Bolt UXP Docs</a>
      <a href="https://svelte.dev">Svelte Docs</a>
      <a href="https://vitejs.dev/">Vite Docs</a>
    </div>
    <!-- BOLT_SAMPLECODE_END -->
  </main>
{/if}

<!-- BOLT_SAMPLECODE_START -->
<!-- Example of a secondary panel entrypoint -->
<!-- <uxp-panel panelid={`${id}.settings`}>
  <h1>Settings Panel</h1>
  <p>count is: {count}</p>
</uxp-panel> -->

<!-- BOLT_SAMPLECODE_END -->

<style lang="scss">
  @use "./variables.scss" as *;
</style>
