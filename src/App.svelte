<script lang="ts">
  import svelteLogo from "./assets/svelte.svg";
  import viteLogo from "./assets/vite.svg";
  import { uxp, indesign, photoshop } from "./globals";
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
</script>

<main>
  <div>
    <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
      <img src={viteLogo} class="logo" alt="Vite Logo" />
    </a>
    <a href="https://svelte.dev" target="_blank" rel="noreferrer">
      <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
    </a>
  </div>
  <h1>Svelte + TypeScript in UXP ✨</h1>

  <div class="card">
    <button on:click={increment}>
      count is {count}
    </button>
    <button on:click={helloWorld}>Hello World</button>
  </div>

  <p>
    Check out <a
      href="https://github.com/sveltejs/kit#readme"
      target="_blank"
      rel="noreferrer">SvelteKit</a
    >, the official Svelte app framework powered by Vite!
  </p>

  <p class="read-the-docs">Click on the Vite and Svelte logos to learn more</p>
</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>
