export const globalIncludes: string[] = [
  "*",
  "src/**/*",
  "public/**/*",
  "public-zip/**/*",
  ".github/**/*",
  ".gitignore",
  ".env.example",
];
export const globalExcludes: string[] = [".env", "yarn-error.log"];

export const hybridFiles: string[] = ["public-hybrid/**/*", "scripts/**/*"];

export type Opt = {
  value: string;
  label: string;
  files: string[];
};

export const frameworkOptions: Opt[] = [
  {
    value: "svelte",
    label: "Svelte",
    files: ["src/index-svelte.ts", "src/main.svelte", "package.svelte.json"],
  },
  {
    value: "react",
    label: "React",
    files: ["src/index-react.tsx", "src/main.tsx", "package.react.json"],
  },
  {
    value: "vue",
    label: "Vue",
    files: ["src/index-vue.ts", "src/main.vue", "package.vue.json"],
  },
];
export const frameworkValues = frameworkOptions.map((f) => f.value);

export const appOptions: Opt[] = [
  { value: "photoshop", label: "Photoshop", files: ["src/api/photoshop.ts"] },
  { value: "indesign", label: "InDesign", files: ["src/api/indesign.ts"] },
  {
    value: "premierepro",
    label: "Premiere Pro (Beta)",
    files: ["src/api/premierepro.ts"],
  },
  {
    value: "illustrator",
    label: "Illustrator (Beta)",
    files: ["src/api/illustrator.ts"],
  },
];

export const appValues = appOptions.map((f) => f.value);
