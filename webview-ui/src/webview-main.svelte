<script lang="ts">
  import { onMount } from "svelte";
  import * as Comlink from "comlink";

  const parentEndpoint = Comlink.windowEndpoint(window.uxpHost);
  const api = Comlink.wrap(parentEndpoint);
  window.api = api;

  const comlinkResponse = async () => {
    // await api.notify("Hello from webview!");
    // await api.photoshop.app.showAlert("Hi from Webview Land!");
    await api.uxp.dialog.showOpenDialog();

    // Optionally, expose something back to the parent:
    // Comlink.expose({ ping: () => "pong from webview" }, parentEndpoint);
  };

  const sendMessage = () => {
    window.uxpHost.postMessage(
      { type: "message", text: "webview-to-uxp" },
      "*"
    );
  };

  window.addEventListener("message", (e) => {
    console.log(e);
  });
</script>

<main>
  <h2>Bolt UXP Webview</h2>
  <div class="button-group">
    <button onclick={sendMessage}>Send Message</button>
    <button onclick={comlinkResponse}>Send Comlink</button>
  </div>
</main>

<style lang="scss">
  .button-group {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }
  button {
    transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    outline: none;
  }
  button:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
    padding-right: 2rem;
    padding-left: 2rem;
  }
</style>
