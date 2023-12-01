#!/usr/bin/env node

import * as color from "picocolors";
import {
  intro,
  note,
  outro,
  spinner,
  multiselect,
  select,
  text,
  isCancel,
  cancel,
  confirm,
} from "@clack/prompts";
import { dash } from "radash";
import { buildBoltUXP } from "./build";

import { frameworkOptions, appOptions } from "./data";

main();

const handleCancel = (value: unknown) => {
  if (isCancel(value)) {
    cancel("Operation cancelled");
    return process.exit(0);
  }
};

async function main() {
  console.clear();
  boltIntro();

  const folder = await text({
    message: "Where do you want to create your project?",
    // placeholder: 'Not sure',
    initialValue: "./",
    validate(value) {
      if (value.length < 3) return `Value is required!`;
    },
  });
  handleCancel(folder);
  const displayName = await text({
    message: "Choose a unique Display Name for your plugin:",
    // placeholder: 'Not sure',
    initialValue: "Bolt UXP",
    validate(value) {
      if (value.length === 0) return `Value is required!`;
    },
  });
  handleCancel(displayName);
  const id = await text({
    message: "Choose a unique ID for your plugin:",
    // placeholder: 'Not sure',
    initialValue: `${dash(displayName.toString()).replace(/\-/g, ".")}.plugin`,
    validate(value) {
      if (value.length === 0) return `Value is required!`;
    },
  });
  handleCancel(id);
  const framework = await select({
    message: "Select framework:",
    options: frameworkOptions,
  });
  handleCancel(framework);
  const apps = await multiselect({
    message: "Select app:",
    options: appOptions,
    required: true,
  });
  handleCancel(apps);
  const enableHybrid = await confirm({
    message: `Do you want to include UXP Hybrid Plugin (C++) files?`,
    initialValue: true,
  });
  handleCancel(enableHybrid);
  const recommended = color.gray("(recommended)");
  const installDeps = await confirm({
    message: `Do you want to install dependencies? ${recommended}`,
    initialValue: true,
  });
  handleCancel(installDeps);

  if (
    typeof folder !== "symbol" &&
    typeof displayName !== "symbol" &&
    typeof id !== "symbol" &&
    typeof framework !== "symbol" &&
    typeof apps !== "symbol" &&
    typeof installDeps !== "symbol" &&
    typeof enableHybrid !== "symbol"
  ) {
    //@ts-ignore
    buildBoltUXP({
      folder,
      displayName,
      id,
      framework: framework as string,
      apps: apps as string[],
      enableHybrid,
      installDeps,
    });
  }
}

function boltIntro() {
  console.log();
  const cbc = color.bgGreen(` create-bolt-uxp `);
  const url = color.underline("https://hyperbrew.co");
  const bru = color.gray("│   ") + color.cyan(`by Hyper Brew | ${url}`);
  intro(`${cbc} \n${bru}`);
}
