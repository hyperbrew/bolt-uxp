<script lang="ts">
  // BOLT_SAMPLECODE_START
  import { uxp, indesign, photoshop } from "./globals";
  import { api } from "./api/api";
  import boltUxpLogo from "./assets/bolt-uxp.png";
  import viteLogo from "./assets/vite.png";
  import tsLogo from "./assets/typescript.png";
  import sassLogo from "./assets/sass.png";
  import svelteLogo from "./assets/svelte.png";

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
