import { existsSync, rmSync } from "fs";
import { createBoltUXP } from "../src";

const runTests = async () => {
  existsSync(".test-svelte") &&
    rmSync(".test-svelte", { recursive: true, force: true });

  existsSync(".test-react") &&
    rmSync(".test-react", { recursive: true, force: true });

  existsSync(".test-vue") &&
    rmSync(".test-vue", { recursive: true, force: true });

  const svelte = await createBoltUXP({
    folder: ".test-svelte",
    displayName: "Test Svelte",
    id: "com.test.svelte",
    framework: "svelte",
    apps: ["phxs"],
    hybrid: true,
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
    sampleCode: true,
    installDeps: false,
  });

  const allNoHybrid = await createBoltUXP({
    folder: ".test-all",
    displayName: "Test All",
    id: "com.test.all",
    framework: "svelte",
    apps: ["phxs", "idsn", "ppro"],
    hybrid: false,
    sampleCode: false,
    installDeps: false,
  });

  console.log({
    svelte,
    vue,
    react,
    allNoHybrid,
  });
};
runTests();
