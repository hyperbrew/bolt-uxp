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

export const appOptions: Opt[] = [
  { value: "photoshop", label: "Photoshop", files: ["src/api/photoshop.ts"] },
  { value: "indesign", label: "InDesign", files: ["src/api/indesign.ts"] },
  {
    value: "illustrator",
    label: "Illustrator (Beta)",
    files: ["src/api/illustrator.ts"],
  },
  {
    value: "premierepro",
    label: "Premiere Pro (Beta)",
    files: ["src/api/premierepro.ts"],
  },
];
