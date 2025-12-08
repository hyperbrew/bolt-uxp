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
  const { api, page } = initWebview(webviewAPI);

  const simpleAlert = async () =>
    await api.notify(`Hello from Webview: ${page}`);

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
      Edit <span class="code">webview-ui/src/main-webview.svelte</span> and save
      to test HMR updates.
    </p>
    <p>Webview page: {page}</p>
  </div>
  <div class="button-group">
    <a href="https://github.com/hyperbrew/bolt-uxp/" onclick={clickLink}>
      Bolt UXP Docs
    </a>
    <a href="https://svelte.dev" onclick={clickLink}>Svelte Docs</a>
    <a href="https://vitejs.dev/" onclick={clickLink}>Vite Docs</a>
  </div>
</main>

<style lang="scss">
</style>
