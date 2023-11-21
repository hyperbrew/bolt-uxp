import * as path from "path";
import * as fs from "fs";

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
};
export const buildBoltUXP = async (args: Args) => {
  console.log(args);

  const fullPath = path.join(process.cwd(), args.folder);
  console.log(fullPath);
  fs.mkdirSync(fullPath, { recursive: true });

  const boltUxpFolder = path.join(__dirname, "..", "node_modules", "bolt-uxp");
  console.log(boltUxpFolder);

  let files = [
    "index.html",
    // "package.json",
    "README.md",
    "tsconfig.json",
    "uxp.config.ts",
    "vite.config.ts",
    "yarn.lock",
    ".gitignore",
    "public",

    "src/api",
    "src/app.css",
    "src/assets",
    "src/globals.ts",
    "src/hybrid",
    "src/index.scss",
    "src/types",
    "src/variables.scss",
    "src/vite-env.d.ts",
  ];

  if (args.framework === "react") {
    files = [
      ...files,
      "src/index-react.tsx",
      "src/main.tsx",
      "package.react.json",
    ];
  } else if (args.framework === "svelte") {
    files = [
      ...files,
      "src/index-svelte.ts",
      "src/main.svelte",
      "package.svelte.json",
    ];
  } else if (args.framework === "vue") {
    files = [...files, "src/index-vue.ts", "src/main.vue", "package.vue.json"];
  }

  if (args.enableHybrid) {
    files = [...files, "src/hybrid", "public-hybrid"];
  }

  files.map((file) => {
    const fileName = path.basename(file);
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

  const packageJson = path.join(fullPath, "package.json");
  const packageJsonData = JSON.parse(fs.readFileSync(packageJson, "utf8"));

  const uxpConfig = path.join(fullPath, "uxp.config.ts");
  const uxpConfigData = fs.readFileSync(uxpConfig, "utf8");

  const indexHtml = path.join(fullPath, "index.html");
  const indexHtmlData = fs.readFileSync(indexHtml, "utf8");

  const viteConfig = path.join(fullPath, "vite.config.ts");
  const viteConfigData = fs.readFileSync(viteConfig, "utf8");
};
