#!/usr/bin/env node

import { main } from "meta-bolt";
import type { BoltInitData, ArgOpt } from "meta-bolt";
import { ResArgs } from "meta-bolt/dist/types";

const frameworkOptions: ArgOpt[] = [
  {
    value: "svelte",
    label: "Svelte",
    files: [
      "src/index-svelte.ts",
      "src/main.svelte",
      "package.svelte.jsonc",
      "tsconfig.svelte.json",

      "webview-ui/src/index-webview-svelte.ts",
      "webview-ui/src/main-webview.svelte",
      "webview-ui/package.svelte.jsonc",
      "webview-ui/tsconfig.svelte.json",
    ],
  },
  {
    value: "react",
    label: "React",
    files: [
      "src/index-react.tsx",
      "src/main.tsx",
      "package.react.jsonc",
      "tsconfig.react.json",

      "webview-ui/src/index-webview-react.tsx",
      "webview-ui/src/main-webview.tsx",
      "webview-ui/package.react.jsonc",
      "webview-ui/tsconfig.react.json",
    ],
  },
  {
    value: "vue",
    label: "Vue",
    files: [
      "src/index-vue.ts",
      "src/main.vue",
      "package.vue.jsonc",
      "tsconfig.vue.json",

      "webview-ui/src/index-webview-vue.ts",
      "webview-ui/src/main-webview.vue",
      "webview-ui/package.vue.jsonc",
      "webview-ui/tsconfig.vue.json",
    ],
  },
];

const appOptions: ArgOpt[] = [
  { value: "phxs", label: "Photoshop", files: ["src/api/photoshop.ts"] },
  { value: "idsn", label: "InDesign", files: ["src/api/indesign.ts"] },
  {
    value: "ppro",
    label: "Premiere Pro",
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

      ["tsconfig.svelte.json", "tsconfig.json"],
      ["tsconfig.react.json", "tsconfig.json"],
      ["tsconfig.vue.json", "tsconfig.json"],

      ["webview-ui/package.svelte.jsonc", "webview-ui/package.json"],
      ["webview-ui/package.react.jsonc", "webview-ui/package.json"],
      ["webview-ui/package.vue.jsonc", "webview-ui/package.json"],

      ["webview-ui/tsconfig.svelte.json", "webview-ui/tsconfig.json"],
      ["webview-ui/tsconfig.react.json", "webview-ui/tsconfig.json"],
      ["webview-ui/tsconfig.vue.json", "webview-ui/tsconfig.json"],

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
      message:
        "Do you want to include UXP Hybrid Plugin (C++) files? (PS & ID only)",
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
      name: "webview",
      type: "boolean",
      message:
        "(BETA) Do you want to use a Webview UI Beta with full CSS/HTML support but 2 separate contexts?\n( more info: https://github.com/hyperbrew/bolt-uxp#webview-ui-option )",
      initialValue: false,
      required: true,
      alias: "w",
      describe: "Use a Webivew UI for full CSS/HTML Support (default: false)",
      options: [
        {
          value: "true",
          label: "Yes",
          files: ["webview-ui/**/*"],
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
