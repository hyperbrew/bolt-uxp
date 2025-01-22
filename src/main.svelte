<script lang="ts">
  // BOLT-UXP_SAMPLECODE_START
  import { uxp, indesign, photoshop } from "./globals";
  import { api } from "./api/api";
  import boltUxpLogo from "./assets/bolt-uxp.png";
  import viteLogo from "./assets/vite.png";
  import tsLogo from "./assets/typescript.png";
  import sassLogo from "./assets/sass.png";
  import svelteLogo from "./assets/svelte.png";

  let count: number = 0;
  const increment = () => (count += 1);

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
  const hybridAsyncTest = async () => {
    try {
      let hybridModule: {
        exec: (cmd: string) => Promise<string>;
      } = await require("bolt-uxp-hybrid.uxpaddon");

      let command =
        process.platform === "win32"
          ? "timeout 2 && echo hello"
          : "sleep 2 && echo hello";

      const promise = hybridModule
        .exec(command)
        .then((res) => {
          console.log(`execAsyncRes = `, res);
          api.notify(`execAsyncRes = ${res}`);
        })
        .catch((err) => {
          console.log("Execute as execAsync command failed", err);
          api.notify("Execute as execAsync command failed");
        });
      console.log(`async promise = `, promise);
    } catch (err) {
      console.log("Execute as execSync command failed", err);
    }
  };
  // BOLT-UXP_HYBRID_END

  // BOLT-UXP_WEBVIEW_START
  const startServeSimple = async () => {
    try {
      let hybridModule: {
        execSync: (cmd: string) => string;
      } = await require("bolt-uxp-hybrid.uxpaddon");
      let execSyncRes = hybridModule.execSync("npx serve dist");
      console.log(`execSyncRes = `, execSyncRes);

      // const res = uxp.shell.openPath(
      //   "C:\\Users\\justin\\Documents\\Dev\\Hyper-Brew\\bolt-uxp\\public\\http_server_files.exe"
      // );
      // console.log("res = ", res);
    } catch (err) {
      console.log("Error in opening serve.bat", err);
    }
  };
  const startServeCpp = async () => {
    try {
      let hybridModule: {
        start_server: (cmd: string) => string;
      } = await require("bolt-uxp-hybrid.uxpaddon");
      let execSyncRes = hybridModule.start_server("echo test");
      console.log(`execSyncRes = `, execSyncRes);

      // const res = uxp.shell.openPath(
      //   "C:\\Users\\justin\\Documents\\Dev\\Hyper-Brew\\bolt-uxp\\public\\http_server_files.exe"
      // );
      // console.log("res = ", res);
    } catch (err) {
      console.log("Error in opening serve.bat", err);
    }
  };
  // BOLT-UXP_WEBVIEW_END

  // BOLT-UXP_SAMPLECODE_END
</script>

<main>
  <!-- BOLT-UXP_WEBVIEW_START -->
  <!-- <webview
  id="webviewsample"
  width="500px"
  height="360px"
  src="plugin:/ui/index.html"
  uxpAllowInspector="true"
  ></webview> -->
  <!-- <webview
    id="webviewsample"
    width="500px"
    height="360px"
    src="https://hyperbrew.co"
    uxpAllowInspector="true"
  ></webview>
  <button on:click={() => startServeCpp()}>start serve</button>
  <button on:click={() => startServeSimple()}>start serve simple</button> -->
  <!-- BOLT-UXP_WEBVIEW_END -->

  <!-- BOLT-UXP_SAMPLECODE_START -->

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
    <!-- BOLT-UXP_HYBRID_START -->
    <button on:click={hybridTest}>Hybrid Sync</button>
    <button on:click={hybridAsyncTest}>Hybrid Async</button>
    <!-- BOLT-UXP_HYBRID_END -->
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
  <!-- BOLT-UXP_SAMPLECODE_END -->
</main>

<!-- BOLT-UXP_SAMPLECODE_START -->
<!-- Example of a secondary panel entrypoint -->
<!-- <uxp-panel panelid="bolt.uxp.plugin.settings">
  <h1>Settings Panel</h1>
  <p>count is: {count}</p>
</uxp-panel> -->

<!-- BOLT-UXP_SAMPLECODE_END -->

<style lang="scss">
  @import "./variables.scss";
</style>
