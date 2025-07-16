<script lang="ts">
  import { onMount } from "svelte";
  import * as Comlink from "comlink";

  import type { api as API } from "../../src/api/api";

  const hostEndpoint = {
    postMessage: (msg) => window.uxpHost.postMessage(msg),
    addEventListener: (type, handler) => {
      window.uxpHost.addEventListener("message", handler);
    },
    removeEventListener: (type, handler) => {
      window.uxpHost.removeEventListener("message", handler);
    },
  };

  const endpoint = Comlink.windowEndpoint(hostEndpoint);
  const comlinkAPI = Comlink.wrap(endpoint);
  const api = comlinkAPI.api as typeof API;
  const uxp = comlinkAPI.uxp;
  window.photoshop = comlinkAPI.photoshop;

  const comlinkAlert = async () => {
    console.log("Sending Comlink");
    // Call Methods on our API Object object
    const res = await api.notify("Justin");
    console.log("Comlink Response:", res);
    uxp;

    // call a PS method directly
    // await api.photoshop.app.showAlert("Hi from Webview Land!");

    // call a UXP method directly
    // await api.uxp.dialog.showOpenDialog();
  };
  const comlinkDocInfo = async () => {
    // Can't use references like this
    // const doc = await api.photoshop.app.activeDocument;
    // const path = doc.path;
    // const name = doc.name;

    // Hove to call them verbosely like this:
    const path = await photoshop.app.activeDocument.path;
    const name = await photoshop.app.activeDocument.name;
    console.log("Document Info:", { path, name });
  };

  // basic way to send a message
  const sendMessage = () => {
    window.uxpHost.postMessage(
      { type: "message", text: "webview-to-uxp" },
      "*"
    );
  };

  // window.addEventListener("message", (e) => {
  //   console.log(e);
  // });
</script>

<main>
  <h2>Bolt UXP Webview</h2>
  <div class="button-group">
    <button onclick={sendMessage}>Send Message</button>
    <button onclick={comlinkAlert}>Comlink: Alert</button>
    <button onclick={comlinkDocInfo}>Comlink: Get Document Info</button>
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
