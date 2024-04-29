import * as path from "path";
import * as fs from "fs";
import * as fg from "fast-glob";
import * as color from "picocolors";

import * as prettier from "prettier";

import {
  appOptions,
  frameworkOptions,
  globalExcludes,
  globalIncludes,
  hybridFiles,
} from "./data";
import { execAsync, getPackageManager, posix } from "./utils";
import { spinner, note } from "@clack/prompts";

import { capitalize, replace } from "radash";

export type Args = {
  folder: string;
  displayName: string;
  id: string;
  framework: string;
  apps: string[];
  enableHybrid: boolean | undefined;
  keepSampleCode: boolean | undefined;
  installDeps: boolean | undefined;
  pretty?: boolean;
  verbose?: boolean;
};

export type OptionalArgs = {
  folder?: string;
  displayName?: string;
  id?: string;
  framework?: string;
  apps?: string[];
  enableHybrid?: boolean;
  keepSampleCode?: boolean;
  installDeps?: boolean;
  pretty?: boolean;
  verbose?: boolean;
};

const multiBlankLineRegex = /(\r?\n\s*){1,}/g;

const getJSRangeRegex = (variable: string) =>
  new RegExp(
    `\/\/ BOLT-UXP_${variable}_START[\\s\\S]*?\/\/ BOLT-UXP_${variable}_END.*(\n|\r\n)?`,
    "gm"
  );
const getJSOnlyRegex = (variable: string) =>
  new RegExp(`^.*\/\/ BOLT-UXP_${variable}_ONLY.*(\n|\r\n)?`, "gm");

const allCommentsRegex = /\/\/ BOLT-UXP_.*_(START|END|ONLY).*(\n|\r\n)?/gm;

const getJSXRegex = (variable: string) =>
  new RegExp(
    `\\{\\/\\* BOLT-UXP_${variable}_START \\*\\/\\}([\\s\\S]*?)\\{\\/\\* BOLT-UXP_${variable}_END \\*\\/\\}.*`,
    "gm"
  );

const allJSXCommentsRegex =
  /\{\/\* BOLT-UXP_.*_(START|END|ONLY) \*\/\}.*(\n|\r\n)?/gm;

const getHTMLRegex = (variable: string) =>
  new RegExp(
    `<!-- BOLT-UXP_${variable}_START -->[\\s\\S]*?<!-- BOLT-UXP_${variable}_END -->.*`,
    "g"
  );

const allHTMLCommentsRegex =
  /<!-- BOLT-UXP_.*_(START|END|ONLY) -->.*(\n|\r\n)?/gm;
const htmlDisabledScriptTagRegexStart = /<!-- <script/g;
const htmlDisabledScriptTagRegexEnd = /<\/script> -->.*/g;

const replaceAll = (txt: string, variable: string, replace: string) => {
  const rangeRegexJS = getJSRangeRegex(variable);
  const onlyRegexJS = getJSOnlyRegex(variable);
  const rangeRegexHTML = getHTMLRegex(variable);
  const onlyRegexHTML = getHTMLRegex(variable);
  const rangeRegexJSX = getJSXRegex(variable);

  txt = txt
    .replace(rangeRegexJS, replace)
    .replace(onlyRegexJS, replace)
    .replace(rangeRegexHTML, replace)
    .replace(onlyRegexHTML, replace)
    .replace(rangeRegexJSX, replace);

  return txt;
};

const formatFile = async (
  txt: string,
  ext: string,
  {
    enableHybrid,
    keepSampleCode,
    removeApps,
    removeFrameworks,
  }: {
    enableHybrid: boolean;
    keepSampleCode: boolean;
    removeApps: string[];
    removeFrameworks: string[];
  }
) => {
  [...removeApps, ...removeFrameworks].map((app) => {
    const upper = app.toUpperCase();
    txt = replaceAll(txt, upper, "");
  });
  if (!enableHybrid) {
    txt = replaceAll(txt, "HYBRID", "");
  }
  if (!keepSampleCode) {
    txt = replaceAll(txt, "SAMPLECODE", "");
  }
  // cleanup
  txt = txt.replace(allCommentsRegex, "");
  txt = txt.replace(allHTMLCommentsRegex, "");
  txt = txt.replace(allJSXCommentsRegex, "");
  if (ext === ".html") {
    txt = txt.replace("<!-- Uncomment to debug the desired template -->", "");
    // txt = txt.replace(multiBlankLineRegex, "\n");
    // re-enable all disabled <script /> tags
    txt = txt
      .replace(htmlDisabledScriptTagRegexStart, "<script")
      .replace(htmlDisabledScriptTagRegexEnd, "</script>");
  }
  //   txt = await prettier.format(txt, {
  //     parser: "typescript",
  //   });
  return txt;
};

export const buildBoltUXP = async (args: Args) => {
  const fullPath = path.join(process.cwd(), args.folder);
  note(`Creating Bolt UXP in ${color.green(color.bold(fullPath))}`, "Info");

  const localStem = posix(
    path.join(__dirname, "..", `/node_modules/bolt-uxp/`)
  );
  const globalStem = posix(path.join(__dirname, `../../bolt-uxp`));
  const stem = fs.existsSync(globalStem) ? globalStem : localStem;

  if (fs.existsSync(fullPath)) fs.rmSync(fullPath, { recursive: true });
  fs.mkdirSync(fullPath, { recursive: true });

  let includes = [...globalIncludes];
  let excludes = [...globalExcludes];

  excludes = [
    ...excludes,
    ...frameworkOptions
      .filter((f) => f.value !== args.framework)
      .map((f) => f.files)
      .flat(),
    ...appOptions
      .filter((f) => !args.apps.includes(f.value))
      .map((f) => f.files)
      .flat(),
  ];

  if (args.enableHybrid) {
    includes = [...includes, ...hybridFiles];
  } else {
    excludes = [...excludes, ...hybridFiles];
  }

  const files = await fg(
    [
      ...includes.map((i) => posix(path.join(stem, i))),
      ...excludes.map((i) => `!` + posix(path.join(stem, i))),
    ],
    {
      onlyFiles: true,
      followSymbolicLinks: true,
    }
  );

  const allApps = appOptions.map((app) => app.value);
  const removeApps = allApps.filter((app) => !args.apps.includes(app));
  const removeFrameworks = frameworkOptions
    .filter((f) => f.value !== args.framework)
    .map((f) => f.value);

  for (const file of files) {
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
      const txt = fs.readFileSync(dest, "utf8");
      const ext = path.extname(dest);

      const newTxt = await formatFile(txt, ext, {
        enableHybrid: args.enableHybrid || false,
        keepSampleCode: args.keepSampleCode || false,
        removeApps,
        removeFrameworks,
      });

      // wite file if changed
      if (newTxt !== txt) {
        args.verbose &&
          console.log(`UPDATING CHANGED: ${color.green(color.bold(fileName))}`);
        fs.writeFileSync(dest, newTxt, "utf8");
      }
    }
  }

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
  uxpConfigData = uxpConfigData
    // update name
    .replace(/name: \".*\",/, `name: "${args.displayName}",`)
    .replace(/default: \".*\",/, `default: "${args.displayName}",`)
    // update ids
    .replace(/bolt\.uxp\.plugin/g, args.id);
  fs.writeFileSync(uxpConfig, uxpConfigData, "utf8");

  const pm = getPackageManager() || "npm";
  // * Dependencies
  if (args.installDeps) {
    const s = spinner();
    s.start("Installing dependencies...");
    await execAsync(`cd ${fullPath} && ${pm} install`);
    s.stop("Dependencies installed!");
  }

  note(
    [
      `display name   ${args.displayName}`,
      `id             ${args.id}`,
      `framework      ${args.framework}`,
      `apps           ${args.apps}`,
      `hybrid         ${args.enableHybrid}`,
      `sample code    ${args.keepSampleCode}`,
      `deps           ${args.installDeps}`,
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
        `cd ${path.basename(fullPath)} && ${pm} install`
      )}`,
    ];
  }

  note(summary.join("\n"), "Summary");
  return fullPath;
};
