import { buildBoltUXP } from "./build";

describe("create-bolt-uxp", () => {
  it("TEST SVELTE", async () => {
    const res = await buildBoltUXP({
      folder: ".test-svelte",
      displayName: "test",
      id: "test",
      framework: "svelte",
      apps: ["photoshop"],
      enableHybrid: false,
      installDeps: false,
    });
    expect(res).toBe(undefined);
    // const res2 = await buildBoltUXP({
    //   folder: ".test-vue",
    //   displayName: "test",
    //   id: "test",
    //   framework: "vue",
    //   apps: ["photoshop"],
    //   enableHybrid: true,
    //   installDeps: false,
    // });
    // expect(res).toBe(undefined);
    // const res3 = await buildBoltUXP({
    //   folder: ".test-react",
    //   displayName: "test",
    //   id: "test",
    //   framework: "react",
    //   apps: ["photoshop"],
    //   enableHybrid: true,
    //   installDeps: false,
    // });
    // expect(res).toBe(undefined);
  });
});
