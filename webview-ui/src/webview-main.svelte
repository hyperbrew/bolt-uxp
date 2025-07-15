<script lang="ts">
  import { onMount } from "svelte";

  const sendMessage = () => {
    window.uxpHost.postMessage(
      { type: "message", text: "webview-to-uxp" },
      "*"
    );
  };

  window.addEventListener("message", (e) => {
    console.log(e);
  });
  onMount(() => {});
</script>

<main>
  <h2>Bolt UXP Webview</h2>
  <button onclick={sendMessage}>Send Message</button>
</main>

<style lang="scss">
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
  button {
    transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    outline: none;
  }
  button:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
    padding-left: 2rem;
    padding-right: 2rem;
  }
</style>
