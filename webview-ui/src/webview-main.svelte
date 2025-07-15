<script lang="ts">
  import { onMount } from "svelte";
  import * as Comlink from "comlink";
  window.Comlink = Comlink;

  // Wait for the parent to connect
  // const parentEndpoint = Comlink.windowEndpoint(window.parent);
  const parentEndpoint = Comlink.windowEndpoint(window.uxpHost);
  const parentAPI = Comlink.wrap(parentEndpoint);
  window.parentAPI = parentAPI;

  const comlinkResponse = async () => {
    // Call backend’s `notify()` method
    await parentAPI.notify("Hello from webview!");

    // Optionally, expose something back to the parent:
    // Comlink.expose({ ping: () => "pong from webview" }, parentEndpoint);
  };

  function createProxy({ properties, methods }: string) {
    return new Proxy(
      {},
      {
        get(_, prop) {
          if (prop in properties) {
            return properties[prop];
          }
          if (methods.includes(prop)) {
            return (...args) => {
              // You’ll replace this with actual backend call logic
              console.log(`Calling method "${prop}" with`, args);
            };
          }
          return undefined;
        },
        set(_, prop, value) {
          // Update frontend copy and optionally sync to backend
          properties[prop] = value;
          console.log(`Setting property "${prop}" to`, value);
          return true;
        },
      }
    );
  }

  const sendMessage = () => {
    window.uxpHost.postMessage(
      { type: "message", text: "webview-to-uxp" },
      "*"
    );
  };

  window.addEventListener("message", (e) => {
    console.log(e);
    // const msgData = JSON.parse(e.data);
    // console.log(msgData);
    // window.uxp = createProxy(msgData.data);
  });
</script>

<main>
  <h2>Bolt UXP Webview</h2>
  <!-- <button onclick={sendMessage}>Send Message</button> -->
  <button onclick={comlinkResponse}>Send Comlink</button>
</main>

<style lang="scss">
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
