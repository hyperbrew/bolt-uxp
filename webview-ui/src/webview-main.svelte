<script lang="ts">
  import { initWebview } from "./webview-setup";
  const api = initWebview();

  const comlinkAlert = async () => await api.notify("Hello World");

  let projectInfo: string = $state("");
  const comlinkProjectInfo = async () => {
    const info = await api.getProjectInfo();
    projectInfo = JSON.stringify(info, null, 2);
    console.log("Project Info:", { info });
  };

  let uxpInfo: string = $state("");
  const comlinkUXPInfo = async () => {
    const info = await api.getUXPInfo();
    uxpInfo = JSON.stringify(info, null, 2);
    console.log("Project Info:", { info });
  };
</script>

<main>
  <h2>Bolt UXP Webview</h2>
  <div class="button-group">
    <button onclick={comlinkAlert}>Alert</button>
    <button onclick={comlinkProjectInfo}>Get Project Info</button>
    <button onclick={comlinkUXPInfo}>Get UXP Info</button>
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
</style>
