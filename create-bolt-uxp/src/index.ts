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

import { parseArgs } from "./parse-args";

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
  const args = await parseArgs();

  let {
    folder,
    displayName,
    id,
    framework,
    apps,
    enableHybrid,
    keepSampleCode,
    installDeps,
  } = args;

  if (folder.length === 0) {
    folder = (await text({
      message: "Where do you want to create your project?",
      // placeholder: 'Not sure',
      initialValue: "./",
      validate(value) {
        if (value.length < 3) return `Value is required!`;
      },
    })) as string;
    handleCancel(folder);
  }
  if (displayName.length === 0) {
    displayName = (await text({
      message: "Choose a unique Display Name for your plugin:",
      // placeholder: 'Not sure',
      initialValue: "Bolt UXP",
      validate(value) {
        if (value.length === 0) return `Value is required!`;
      },
    })) as string;
    handleCancel(displayName);
  }
  if (id.length === 0) {
    id = (await text({
      message: "Choose a unique ID for your plugin:",
      // placeholder: 'Not sure',
      initialValue: `${dash(displayName.toString()).replace(
        /\-/g,
        "."
      )}.plugin`,
      validate(value) {
        if (value.length === 0) return `Value is required!`;
      },
    })) as string;
    handleCancel(id);
  }
  if (framework.length === 0) {
    framework = (await select({
      message: "Select framework:",
      options: frameworkOptions,
    })) as string;
    handleCancel(framework);
  }
  if (apps.length === 0) {
    apps = (await multiselect({
      message: "Select app:",
      options: appOptions,
      required: true,
    })) as string[];
    handleCancel(apps);
  }
  if (typeof enableHybrid !== "boolean") {
    enableHybrid = (await confirm({
      message: `Do you want to include UXP Hybrid Plugin (C++) files?`,
      initialValue: true,
    })) as boolean;
    handleCancel(enableHybrid);
  }
  if (typeof keepSampleCode !== "boolean") {
    keepSampleCode = (await confirm({
      message: `Do you want to keep sample code and buttons?`,
      initialValue: true,
    })) as boolean;
    handleCancel(keepSampleCode);
  }
  if (typeof installDeps !== "boolean") {
    installDeps = (await confirm({
      message: `Do you want to install dependencies? ${color.gray(
        "(recommended)"
      )}`,
      initialValue: true,
    })) as boolean;
    handleCancel(installDeps);
  }

  if (
    typeof folder === "string" &&
    typeof displayName === "string" &&
    typeof id === "string" &&
    typeof framework === "string" &&
    Array.isArray(apps) &&
    typeof installDeps === "boolean" &&
    typeof enableHybrid === "boolean" &&
    typeof keepSampleCode === "boolean"
  ) {
    buildBoltUXP({
      folder,
      displayName,
      id,
      framework,
      apps,
      enableHybrid,
      keepSampleCode,
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
