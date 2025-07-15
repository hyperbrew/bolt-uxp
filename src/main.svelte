<script lang="ts">
  // BOLT_SAMPLECODE_START
  import { uxp, indesign, photoshop } from "./globals";
  import { api } from "./api/api";
  import boltUxpLogo from "./assets/bolt-uxp.png";
  import viteLogo from "./assets/vite.png";
  import tsLogo from "./assets/typescript.png";
  import sassLogo from "./assets/sass.png";
  import svelteLogo from "./assets/svelte.png";
  import { onMount } from "svelte";

  // BOLT_WEBVIEW_START
  import * as Comlink from "comlink";
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

  // BOLT_WEBVIEW_START

  function storeForProxy(obj: object) {
    const descriptor = {
      properties: {},
      methods: [],
    };

    for (const key of Reflect.ownKeys(obj)) {
      const val = obj[key];
      if (typeof val === "function") {
        descriptor.methods.push(key);
      } else {
        descriptor.properties[key] = val;
      }
    }
    return descriptor;
  }

  const connectComlink = (webview: HTMLElement) => {
    console.log("Comlink Connecting");
    try {
      const childEndpoint = Comlink.windowEndpoint(webview.postMessage);
      console.log({ childEndpoint });
      const childAPI = Comlink.wrap(childEndpoint);
      Comlink.expose(
        {
          uxp,
          photoshop,
          api,
          // notify: (msg: string) => {
          //   console.log("Received message from webview:", msg);
          //   api.notify(msg);
          // },
        },
        childEndpoint
      );
      // console.log(await childAPI.ping());  // → "pong"
    } catch (e) {
      console.error("Error creating Comlink endpoint:");
    }
  };

  let webview: null | HTMLElement = $state(null);
  onMount(() => {
    if (!webview) return console.error("Webview element not found");
    webview.addEventListener("loadstop", () => {
      connectComlink(webview);
      // webview.postMessage({type: "uxp-to-webview"});
      webview.postMessage(
        JSON.stringify({
          type: "uxp-proxy",
          name: "uxp",
          data: storeForProxy(uxp),
        })
      );
      window.addEventListener("message", (e) => {
        // Get Messages Here
        console.log(e.data);
        // api.notify(`Received message: ${e.data.text}`);
      });
    });
  });
  // BOLT_WEBVIEW_END
</script>

<!-- BOLT_WEBVIEW_START -->

<!-- TODO: Make HMR Port Dynamic -->
<webview
  bind:this={webview}
  class="webview-ui"
  src={import.meta.env.VITE_BOLT_MODE === "dev"
    ? "http://localhost:8081/"
    : "plugin:/webview-ui/index.html"}
  uxpAllowInspector="true"
></webview>

<!-- BOLT_WEBVIEW_END -->
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
    <button on:click={increment}>
      count is {count}
    </button>
    <button on:click={helloWorld}>Hello World</button>
    <!-- BOLT_HYBRID_START -->
    <button on:click={hybridTest}>Hybrid</button>
    <!-- BOLT_HYBRID_END -->
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

<!-- BOLT_SAMPLECODE_START -->
<!-- Example of a secondary panel entrypoint -->
<!-- <uxp-panel panelid="bolt.uxp.plugin.settings">
  <h1>Settings Panel</h1>
  <p>count is: {count}</p>
</uxp-panel> -->

<!-- BOLT_SAMPLECODE_END -->

<style lang="scss">
  @use "./variables.scss" as *;
</style>
