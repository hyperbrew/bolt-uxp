#!/usr/bin/env node

import { main } from "meta-bolt";
import type { BoltInitData, ArgOpt } from "meta-bolt";
import { ResArgs } from "meta-bolt/dist/types";

const frameworkOptions: ArgOpt[] = [
  {
    value: "svelte",
    label: "Svelte",
    files: ["src/index-svelte.ts", "src/main.svelte", "package.svelte.jsonc"],
  },
  {
    value: "react",
    label: "React",
    files: ["src/index-react.tsx", "src/main.tsx", "package.react.jsonc"],
  },
  {
    value: "vue",
    label: "Vue",
    files: ["src/index-vue.ts", "src/main.vue", "package.vue.jsonc"],
  },
];

const appOptions: ArgOpt[] = [
  { value: "phxs", label: "Photoshop", files: ["src/api/photoshop.ts"] },
  { value: "idsn", label: "InDesign", files: ["src/api/indesign.ts"] },
  {
    value: "ppro",
    label: "Premiere Pro (Beta)",
    files: ["src/api/premierepro.ts"],
  },
  {
    value: "ilst",
    label: "Illustrator (Beta)",
    files: ["src/api/illustrator.ts"],
  },
];

const initData: BoltInitData = {
  intro: {
    name: "create-bolt-uxp",
    prettyName: "Bolt UXP",
  },
  base: {
    module: "bolt-uxp",
    createDirName: __dirname,
    globalIncludes: [
      "*",
      "src/**/*",
      ".github/**/*",
      ".gitignore",
      ".npmrc",
      ".prettierrc",
      ".env.example",
      "public-zip/**/*",
    ],
    globalExcludes: [
      ".env",
      "yarn-error.log",
      "package.json",
      "tsconfig.json",
      "LICENSE",
      "src/hybrid/win/.vs/**/*",
      "src/hybrid/win/x64/**/*",
      "src/hybrid/win/x86/**/*",
      "src/hybrid/win/build",
    ],
    fileRenames: [
      ["package.svelte.jsonc", "package.json"],
      ["package.react.jsonc", "package.json"],
      ["package.vue.jsonc", "package.json"],

      [".npmignore", ".gitignore"],
    ],
  },
  argsTemplate: [
    {
      name: "folder",
      type: "folder",
      message: "Where do you want to create your project?",
      initialValue: "./",
      required: true,
      validator: (input: string) => {
        if (input.length < 1) return `Value is required!`;
      },
      describe: "Name of the folder for the new Adobe UXP plugin ",
    },
    {
      name: "displayName",
      type: "string",
      message: "Choose a unique Display Name for your UXP plugin:",
      initialValue: "Bolt UXP",
      required: true,
      validator: (input: string) => {
        if (input.length < 1) return `Value is required!`;
      },
      describe: "Panel's display name",
      alias: "n",
    },
    {
      name: "id",
      type: "string",
      message: "Choose a unique ID for your UXP plugin:",
      initialValue: "com.bolt.uxp",
      required: true,
      validator: (input: string) => {
        if (input.length < 1) return `Value is required!`;
      },
      describe: "Unique ID for your UXP plugin (e.g. com.bolt.cep)",
      alias: "i",
    },
    {
      name: "framework",
      type: "select",
      message: "Select framework:",
      alias: "f",
      describe: "Select a Framework for your UXP plugin:",
      options: frameworkOptions,
      required: true,
    },
    {
      name: "apps",
      type: "multiselect",
      message: "Select app:",
      alias: "a",
      describe: "Select app(s) for your UXP plugin:",
      options: appOptions,
      validator: (input: string[]) => {
        if (input.length < 1) return `At Least One value Required!`;
      },
      required: true,
    },
    {
      name: "hybrid",
      type: "boolean",
      message: "Do you want to include UXP Hybrid Plugin (C++) files?",
      initialValue: true,
      required: true,
      alias: "h",
      describe: "Keep Hybrid Plugin Files (default: true)",
      options: [
        {
          value: "true",
          label: "Yes",
          files: ["public-hybrid/**/*", "src/hybrid/**/*", "scripts/**/*"],
        },
        { value: "false", label: "No", files: [] },
      ],
    },
    {
      name: "installDeps",
      type: "boolean",
      message: "Install dependencies?",
      initialValue: true,
      required: true,
      alias: "d",
      describe: "Install dependencies (default: false)",
    },
    {
      name: "sampleCode",
      type: "boolean",
      message: "Keep Sample Code Snippets?",
      initialValue: true,
      required: true,
      alias: "s",
      describe: "Keep Sample Code (default: true)",
    },
  ],
};

export const createBoltUXP = async (overrideArgs: ResArgs = {}) => {
  return await main(initData, overrideArgs);
};

//* if not using as a module, run immediately
console.log("BOLT_MODULEONLY", process.env.BOLT_MODULEONLY);
if (!process.env.BOLT_MODULEONLY) createBoltUXP();
