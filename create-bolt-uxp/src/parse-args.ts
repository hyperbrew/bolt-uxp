// import { formatTitle } from "./format-title";
import * as color from "picocolors";
import * as yargs from "yargs";
// import {
//   App,
//   apps,
//   Framework,
//   frameworks,
//   isAppStringArray,
//   isFrameworkString,
//   isTemplateString,
//   Options,
//   Template,
//   templates,
// } from "./options";
// import { parsePath } from "./parse-path";

import type { Args } from "./build";
import {
  appOptions,
  appValues,
  frameworkOptions,
  frameworkValues,
} from "./data";

import { parsePath } from "./parse-path";

export async function parseArgs(): Promise<Args> {
  const argv = await yargs
    .usage("Usage: $0 <appname> [options]")
    .positional("folder", {
      describe: "Name of the folder for the new Bolt UXP plugin",
      type: "string",
    })
    .option("framework", {
      alias: "f",
      choices: frameworkValues,
      type: "string",
    })
    .option("apps", {
      alias: "a",
      choices: appValues,
      coerce: (arg: string | string[]) => {
        if (typeof arg === "string") {
          return arg.split(",");
        } else if (Array.isArray(arg)) {
          return arg.flatMap((a) => a.split(","));
        }
      },
      type: "array",
    })
    .option("id", {
      alias: "i",
      describe: "Unique ID for UXP Panel (e.g. bolt.uxp.plugin)",
      type: "string",
    })
    .option("display-name", {
      alias: "n",
      describe: "Panel's display name (e.g. Bolt UXP)",
      type: "string",
    })
    .option("hybrid", {
      alias: "h",
      describe: "Enable C++ Hybrid Plugin (default: true)",
      type: "boolean",
    })
    .option("install-dependencies", {
      alias: "d",
      describe: "Install dependencies (default: false)",
      type: "boolean",
    })
    .option("sample-code", {
      alias: "s",
      describe: "Keep Sample Code (default: true)",
      type: "boolean",
    })
    .check(({ framework, template, apps: _apps }) => {
      if (framework && !frameworkValues.includes(framework)) {
        throwError(
          "--framework",
          `needs to be one of: ${frameworkValues
            .map((x) => `'${x}'`)
            .join(", ")}`,
          framework
        );
      }
      if (_apps?.length && !_apps.every((app) => appValues.includes(app))) {
        throwError(
          "--apps",
          `values need to be of supported apps: ${appValues.map((x) => `'${x}'`).join(", ")}`, // prettier-ignore
          appValues.join(",")
        );
      }

      return true;
    })
    .example([
      [
        'create bolt-uxp <folder> -f svelte -a "photoshop" -i test.my.panel -n "Test"',
        "",
      ],
      ['create bolt-uxp <folder> -f react -a "photoshop,indesign"', ""],
      ["create bolt-uxp <folder>", ""],
    ])
    .help().argv;

  const folder = argv["_"][0] ? String(argv["_"][0]) : "";

  if (argv._.length === 0) {
    return {
      folder: "",
      displayName: "",
      id: "",
      framework: "",
      apps: [],
      enableHybrid: argv.hybrid || undefined,
      keepSampleCode: argv.sampleCode || undefined,
      installDeps: argv.installDependencies || undefined,
    };
  }

  return {
    folder: folder || "",
    displayName: argv.displayName || "",
    id: argv.id || "",
    framework: argv.framework || "",
    apps: argv.apps || [],
    enableHybrid: argv.hybrid || false,
    keepSampleCode: argv.sampleCode || true,
    installDeps: argv.installDependencies || false,
  };
}

export function throwError(arg: string, message: string, value: string) {
  const label = color.bgRed(` error `);
  const _arg = color.yellow(arg);
  const valueLabel = color.bgYellow(` value `);
  throw new Error(
    `\n${label} ${_arg} ${message}\n${valueLabel} ${_arg} was '${value}'\n`
  );
}
