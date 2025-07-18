<script lang="ts">
  // BOLT_SAMPLECODE_START
  import boltUxpLogo from "../../src/assets/bolt-uxp.png";
  import viteLogo from "../../src/assets/vite.png";
  import tsLogo from "../../src/assets/typescript.png";
  import sassLogo from "../../src/assets/sass.png";
  import svelteLogo from "../../src/assets/svelte.png";
  let count: number = $state(0);

  const increment = () => (count += 1);
  // BOLT_SAMPLECODE_END

  import * as webviewAPI from "./webview-api";

  import { initWebview } from "./webview-setup";
  const api = initWebview(webviewAPI);

  const simpleAlert = async () => await api.notify("Hello World");

  let projectInfo: string = $state("");
  const getProjectInfo = async () => {
    const info = await api.getProjectInfo();
    projectInfo = JSON.stringify(info, null, 2);
    console.log("Project Info:", { info });
    await api.notify(projectInfo);
  };

  let uxpInfo: string = $state("");
  const getUXPInfo = async () => {
    const info = await api.getUXPInfo();
    uxpInfo = JSON.stringify(info, null, 2);
    console.log("Project Info:", { info });
    await api.notify(uxpInfo);
  };
</script>

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
    <button onclick={getProjectInfo}>Get Project Info</button>
    <button onclick={getUXPInfo}>Get UXP Info</button>
  </div>
  <div>
    <p>
      Edit <span class="code">webview-ui/src/main-webview.svelte</span> and save
      to test HMR updates.
    </p>
  </div>
  <div class="button-group">
    <a href="https://github.com/hyperbrew/bolt-uxp/">Bolt UXP Docs</a>
    <a href="https://svelte.dev">Svelte Docs</a>
    <a href="https://vitejs.dev/">Vite Docs</a>
  </div>
</main>

<style lang="scss">
</style>
