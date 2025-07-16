<script lang="ts">
  import { onMount } from "svelte";
  import * as Comlink from "comlink";

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
  const api = Comlink.wrap(endpoint);
  window.api = api;

  // const parentEndpoint = Comlink.windowEndpoint(window.uxpHost);
  // window.parentEndpoint = parentEndpoint;
  // const api = Comlink.wrap(parentEndpoint);
  // Comlink.expose({ ping: () => "pong from webview" }, parentEndpoint);

  const comlinkAlert = async () => {
    console.log("Sending Comlink");
    // call a method on our API object
    // await api.api.notify("Hello from webview!");
    // console.log(await api.api.getNumber());
    const res = await api.greet("Justin");
    console.log("Comlink Response:", res);

    // call a PS method directly
    // await api.photoshop.app.showAlert("Hi from Webview Land!");

    // call a UXP method directly
    // await api.uxp.dialog.showOpenDialog();
  };
  const comlinkDocInfo = async () => {
    const doc = await api.photoshop.app.activeDocument;
    // Can't store references like this
    // const path = doc.path;
    // const name = doc.name;
    // console.log("Document Info:", { path, name });

    // Hove to call them verbosely like this:

    const path = await api.photoshop.app.activeDocument.path;
    const name = await api.photoshop.app.activeDocument.name;
    console.log("Document Info:", { path, name });
  };

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
