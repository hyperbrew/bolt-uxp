<script lang="ts">
  import boltUxpLogo from "../../src/assets/bolt-uxp.png";
  import * as webviewAPI from "./webview-api";

  import { initWebview } from "./webview-setup";
  const api = initWebview(webviewAPI);

  const simpleAlert = async () => await api.notify("Hello World");

  let projectInfo: string = $state("");
  const getProjectInfo = async () => {
    const info = await api.getProjectInfo();
    projectInfo = JSON.stringify(info, null, 2);
    console.log("Project Info:", { info });
  };

  let uxpInfo: string = $state("");
  const getUXPInfo = async () => {
    const info = await api.getUXPInfo();
    uxpInfo = JSON.stringify(info, null, 2);
    console.log("Project Info:", { info });
  };
</script>

<main>
  <h2>Bolt UXP Webview</h2>
  <div>
    <img class="logo-lg" src={boltUxpLogo} alt="" />
  </div>
  <div class="button-group">
    <button onclick={simpleAlert}>Alert</button>
    <button onclick={getProjectInfo}>Get Project Info</button>
    <button onclick={getUXPInfo}>Get UXP Info</button>
  </div>
  <textarea spellcheck="false">{projectInfo}</textarea>
  <textarea spellcheck="false">{uxpInfo}</textarea>
</main>

<style lang="scss">
  .button-group {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  button {
    transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    outline: none;
  }
  button:hover {
    filter: drop-shadow(0 0 2em #20639b);
    padding-right: 2rem;
    padding-left: 2rem;
  }
  textarea {
    width: calc(100vw - 8rem);
    height: 110px;
    background-color: transparent;
    border-radius: 5px;
    resize: none;
    margin-top: 1rem;
    color: #43aaff;
    padding: 1rem;
  }
  .logo-lg {
    height: 6rem;
  }
</style>
