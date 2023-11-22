import * as path from "path";
import * as fs from "fs";
import * as fg from "fast-glob";
import * as color from "picocolors";

import * as prettier from "prettier";

import { appOptions, frameworkOptions } from ".";
import { execAsync } from "./utils";
import { spinner, note } from "@clack/prompts";

import { capitalize } from "radash";

export type Opt = {
  value: string;
  label: string;
};
type Args = {
  folder: string;
  displayName: string;
  id: string;
  framework: string;
  apps: string[];
  enableHybrid: boolean;
  installDeps: boolean;
  pretty?: boolean;
};

const multiBlankLineRegex = /(\r?\n\s*){1,}/g;

const getJSRegex = (variable: string) =>
  new RegExp(
    `\/\/ BOLT-UXP_${variable}_START[\\s\\S]*?\/\/ BOLT-UXP_${variable}_END.*`,
    "g"
  );
const allCommentsRegex = /\/\/ BOLT-UXP_.*_(START|END)/g;

const getHTMLRegex = (variable: string) =>
  new RegExp(
    `<!-- BOLT-UXP_${variable}_START -->[\\s\\S]*?<!-- BOLT-UXP_${variable}_END -->.*`,
    "g"
  );

const allHTMLCommentsRegex = /<!-- BOLT-UXP_.*_(START|END) -->/g;
const htmlDisabledScriptTagRegexStart = /<!-- <script/g;
const htmlDisabledScriptTagRegexEnd = /<\/script> -->.*/g;

export const buildBoltUXP = async (args: Args) => {
  // console.log(args);

  const fullPath = path.join(process.cwd(), args.folder);
  // console.log(fullPath);

  if (fs.existsSync(fullPath)) {
    fs.rmSync(fullPath, { recursive: true });
  }

  fs.mkdirSync(fullPath, { recursive: true });

  const boltUxpFolder = path.join(__dirname, "..", "node_modules", "bolt-uxp");
  // console.log(boltUxpFolder);

  let includes: string[] = ["*", "src/**/*", "public/**/*"];
  let excludes: string[] = [];
  const stem = `./node_modules/bolt-uxp/`;

  const reactFiles = [
    "src/index-react.tsx",
    "src/main.tsx",
    "package.react.json",
  ];

  const svelteFiles = [
    "src/index-svelte.ts",
    "src/main.svelte",
    "package.svelte.json",
  ];

  const vueFiles = ["src/index-vue.ts", "src/main.vue", "package.vue.json"];

  if (args.framework === "react") {
    excludes = [...excludes, ...svelteFiles, ...vueFiles];
  } else if (args.framework === "svelte") {
    excludes = [...excludes, ...reactFiles, ...vueFiles];
  } else if (args.framework === "vue") {
    excludes = [...excludes, ...reactFiles, ...svelteFiles];
  }

  if (args.enableHybrid) {
    includes = [...includes, "public-hybrid/**/*"];
  } else {
    excludes = [...excludes, "src/hybrid/**/*"];
  }

  const files = await fg(
    [...includes.map((i) => stem + i), ...excludes.map((i) => `!` + stem + i)],
    {
      onlyFiles: true,
      followSymbolicLinks: true, // Set to false to not follow symlinks
    }
  );
  // console.log(files);

  files.map((file) => {
    // const fileName = path.basename(file);
    const fileName = file.replace(stem, "");
    const dest = path.join(fullPath, fileName);
    const parent = path.dirname(dest);
    if (!fs.existsSync(parent)) fs.mkdirSync(parent, { recursive: true });
    if (fs.statSync(file).isDirectory()) {
      fs.cpSync(file, dest, {
        recursive: true,
      });
    } else {
      fs.copyFileSync(file, dest);
    }
  });

  //* Update Config

  //* rename package.json
  fs.renameSync(
    path.join(fullPath, `package.${args.framework}.json`),
    path.join(fullPath, "package.json")
  );

  //* update package.json
  const packageJson = path.join(fullPath, "package.json");
  const packageJsonData = JSON.parse(fs.readFileSync(packageJson, "utf8"));
  packageJsonData.name = args.id;
  fs.writeFileSync(
    packageJson,
    JSON.stringify(packageJsonData, null, 2),
    "utf8"
  );

  //* update uxp.config.ts
  const uxpConfig = path.join(fullPath, "uxp.config.ts");
  let uxpConfigData = fs.readFileSync(uxpConfig, "utf8");

  // update name
  const nameRegex = /name: \".*\",/;
  uxpConfigData = uxpConfigData.replace(
    nameRegex,
    `name: "${args.displayName}",`
  );

  // update id
  const idRegex = /id: \".*\",/;
  uxpConfigData = uxpConfigData.replace(idRegex, `id: "${args.id}",`);

  // update apps
  const allApps = appOptions.map((app) => app.value);
  const removeApps = allApps.filter((app) => !args.apps.includes(app));
  removeApps.map((app) => {
    const upper = app.toUpperCase();
    const regex = getJSRegex(upper);
    // console.log(regex);
    uxpConfigData = uxpConfigData.replace(regex, "");
  });

  // update hybrid
  if (!args.enableHybrid) {
    const regex = getJSRegex("HYBRID");
    uxpConfigData = uxpConfigData.replace(regex, "");
  }

  // cleanup
  uxpConfigData = uxpConfigData.replace(allCommentsRegex, "");

  const uxpConfigDataFormatted = !args.pretty
    ? uxpConfigData
    : await prettier.format(uxpConfigData, {
        parser: "typescript",
      });
  fs.writeFileSync(uxpConfig, uxpConfigDataFormatted, "utf8");

  //* update index.html

  const indexHtml = path.join(fullPath, "index.html");
  let indexHtmlData = fs.readFileSync(indexHtml, "utf8");

  // update framework
  const excludedFrameworks = frameworkOptions
    .filter((f) => f.value !== args.framework)
    .map((f) => f.value);

  excludedFrameworks.map((framework) => {
    const regex = getHTMLRegex(framework.toUpperCase());
    // console.log(regex);
    indexHtmlData = indexHtmlData.replace(regex, "");
  });

  // re-enable all disabled tags
  indexHtmlData = indexHtmlData.replace(
    htmlDisabledScriptTagRegexStart,
    "<script"
  );
  indexHtmlData = indexHtmlData.replace(
    htmlDisabledScriptTagRegexEnd,
    "</script>"
  );

  // cleanup
  indexHtmlData = indexHtmlData.replace(allHTMLCommentsRegex, "");
  indexHtmlData = indexHtmlData.replace(
    "<!-- Uncomment to debug the desired template -->",
    ""
  );
  indexHtmlData = indexHtmlData.replace(multiBlankLineRegex, "\n");

  const indexHtmlFormatted = !args.pretty
    ? indexHtmlData
    : await prettier.format(indexHtmlData, {
        parser: "html",
      });
  fs.writeFileSync(indexHtml, indexHtmlFormatted, "utf8");

  const viteConfig = path.join(fullPath, "vite.config.ts");
  let viteConfigData = fs.readFileSync(viteConfig, "utf8");

  excludedFrameworks.map((framework) => {
    const regex = getJSRegex(framework.toUpperCase());
    viteConfigData = viteConfigData.replace(regex, "");
  });

  // cleanup
  viteConfigData = viteConfigData.replace(allCommentsRegex, "");
  const viteConfigFormatted = !args.pretty
    ? viteConfigData
    : await prettier.format(viteConfigData, {
        parser: "typescript",
      });
  fs.writeFileSync(viteConfig, viteConfigFormatted, "utf8");

  // * Dependencies

  if (args.installDeps) {
    const s = spinner();
    s.start("Installing dependencies...");
    await execAsync(`cd ${fullPath} && yarn`);
    s.stop("Dependencies installed!");
  }

  note(
    [
      `panel      ${args.displayName}`,
      `id         ${args.id}`,
      `framework  ${args.framework}`,
      `apps       ${args.apps}`,
      `hybrid     ${args.enableHybrid}`,
    ].join("\n"),
    "Inputs"
  );

  let summary = [
    `Bolt UXP generated with ${capitalize(args?.framework)}` +
      `: ${color.green(color.bold(fullPath))}`,
  ];
  if (!args.installDeps) {
    summary = [
      ...summary,
      "",
      `Dependencies not installed. To install, run: ${color.yellow(
        `cd ${path.basename(fullPath)} && yarn )`
      )}`,
    ];
  }

  note(summary.join("\n"), "Summary");
};
