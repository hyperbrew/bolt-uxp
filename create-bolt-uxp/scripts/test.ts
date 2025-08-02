import { existsSync, rmSync } from "fs";
import { createBoltUXP } from "../src";

const runTests = async () => {
  existsSync(".test-all") &&
    rmSync(".test-all", { recursive: true, force: true });

  existsSync(".test-svelte") &&
    rmSync(".test-svelte", { recursive: true, force: true });

  existsSync(".test-react") &&
    rmSync(".test-react", { recursive: true, force: true });

  existsSync(".test-vue") &&
    rmSync(".test-vue", { recursive: true, force: true });

  existsSync(".test-svelte-webview") &&
    rmSync(".test-svelte-webview", { recursive: true, force: true });

  existsSync(".test-react-webview") &&
    rmSync(".test-react-webview", { recursive: true, force: true });

  existsSync(".test-vue-webview") &&
    rmSync(".test-vue-webview", { recursive: true, force: true });

  const allNoHybrid = await createBoltUXP({
    folder: ".test-all",
    displayName: "Test All",
    id: "com.test.all",
    framework: "svelte",
    apps: ["phxs", "idsn", "ppro"],
    hybrid: false,
    webview: false,
    sampleCode: false,
    installDeps: false,
  });

  const svelte = await createBoltUXP({
    folder: ".test-svelte",
    displayName: "Test Svelte",
    id: "com.test.svelte",
    framework: "svelte",
    apps: ["phxs"],
    hybrid: true,
    webview: false,
    sampleCode: true,
    installDeps: false,
  });

  const vue = await createBoltUXP({
    folder: ".test-vue",
    displayName: "Test Vue",
    id: "com.test.vue",
    framework: "vue",
    apps: ["phxs"],
    hybrid: true,
    webview: false,
    sampleCode: true,
    installDeps: false,
  });

  const react = await createBoltUXP({
    folder: ".test-react",
    displayName: "Test React",
    id: "com.test.react",
    framework: "react",
    apps: ["phxs"],
    hybrid: true,
    webview: false,
    sampleCode: true,
    installDeps: false,
  });

  const svelteWebview = await createBoltUXP({
    folder: ".test-svelte-webview",
    displayName: "Test Svelte Webview",
    id: "com.test.svelte-webview",
    framework: "svelte",
    apps: ["phxs"],
    hybrid: true,
    webview: true,
    sampleCode: true,
    installDeps: false,
  });

  const vueWebview = await createBoltUXP({
    folder: ".test-vue-webview",
    displayName: "Test Vue Webview",
    id: "com.test.vue-webview",
    framework: "vue",
    apps: ["phxs"],
    hybrid: true,
    webview: true,
    sampleCode: true,
    installDeps: false,
  });

  const reactWebview = await createBoltUXP({
    folder: ".test-react-webview",
    displayName: "Test React Webview",
    id: "com.test.react-webview",
    framework: "react",
    apps: ["phxs"],
    hybrid: true,
    webview: true,
    sampleCode: true,
    installDeps: false,
  });

  console.log({
    allNoHybrid,
    svelte,
    vue,
    react,
    svelteWebview,
    vueWebview,
    reactWebview,
  });
};
runTests();
