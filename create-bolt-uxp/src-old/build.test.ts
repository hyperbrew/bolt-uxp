import { buildBoltUXP } from "./build";

describe("create-bolt-uxp", () => {
  it("TEST SVELTE", async () => {
    const svelte = await buildBoltUXP({
      folder: ".test-svelte",
      displayName: "test",
      id: "test",
      framework: "svelte",
      apps: ["photoshop"],
      enableHybrid: false,
      keepSampleCode: true,
      installDeps: false,
      pretty: false,
    });
    expect(svelte).toBeFalsy();

    const vue = await buildBoltUXP({
      folder: ".test-vue",
      displayName: "test",
      id: "test",
      framework: "vue",
      apps: ["photoshop"],
      enableHybrid: true,
      keepSampleCode: true,
      installDeps: false,
      pretty: false,
    });
    expect(vue).toBeFalsy();

    const react = await buildBoltUXP({
      folder: ".test-react",
      displayName: "test",
      id: "test",
      framework: "react",
      apps: ["photoshop"],
      enableHybrid: true,
      keepSampleCode: true,
      installDeps: false,
      pretty: false,
    });
    expect(react).toBeFalsy();
  });
});
