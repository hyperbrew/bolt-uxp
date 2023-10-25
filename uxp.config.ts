import { UXP_Manifest, UXP_Config } from "./vite-uxp-plugin/types";
import { version } from "./package.json";

const manifest: UXP_Manifest = {
  id: "bolt.uxp.plugin",
  name: "Bolt UXP",
  version,
  main: "index.html",
  manifestVersion: 6,
  host: [
    {
      app: "PS",
      minVersion: "24.2.0",
      data: {
        apiVersion: 2,
      },
    },
    // {
    //   app: "ID",
    //   minVersion: "18.5",
    // },
    // {
    //   app: "AI",
    //   minVersion: "18.5",
    // },
    // {
    //   app: "premierepro",
    //   minVersion: "22.3",
    // },
  ],
  entrypoints: [
    {
      type: "command",
      id: "showAbout",
      label: {
        default: "Bolt UXP Command",
      },
    },
    {
      type: "panel",
      id: "bolt.uxp.plugin.panel",
      label: {
        default: "Bolt UXP",
      },
      minimumSize: { width: 230, height: 200 },
      maximumSize: { width: 2000, height: 2000 },
      preferredDockedSize: { width: 230, height: 300 },
      preferredFloatingSize: { width: 230, height: 300 },
      icons: [
        {
          width: 23,
          height: 23,
          path: "icons/dark-panel.png",
          scale: [1, 2],
          theme: ["darkest", "dark", "medium"],
          species: ["chrome"],
        },
        {
          width: 23,
          height: 23,
          path: "icons/light-panel.png",
          scale: [1, 2],
          theme: ["lightest", "light"],
          species: ["chrome"],
        },
      ],
    },
    {
      type: "panel",
      id: "bolt.uxp.plugin.settings",
      label: {
        default: "Bolt UXP Settings",
      },
      minimumSize: { width: 230, height: 200 },
      maximumSize: { width: 2000, height: 2000 },
      preferredDockedSize: { width: 230, height: 300 },
      preferredFloatingSize: { width: 230, height: 300 },
      icons: [
        {
          width: 23,
          height: 23,
          path: "icons/dark-panel.png",
          scale: [1, 2],
          theme: ["darkest", "dark", "medium"],
          species: ["chrome"],
        },
        {
          width: 23,
          height: 23,
          path: "icons/light-panel.png",
          scale: [1, 2],
          theme: ["lightest", "light"],
          species: ["chrome"],
        },
      ],
    },
  ],
  requiredPermissions: {
    localFileSystem: "fullAccess",
    launchProcess: {
      schemes: ["https", "slack", "file", "ws"],
      extensions: [".xd", ".psd", ".bat", ".cmd"],
    },
    network: {
      domains: ["https://hyperbrew.co", "ws://localhost:8080"],
    },
    clipboard: "readAndWrite",
    webview: {
      allow: "yes",
      domains: ["https://*.hyperbrew.co"],
    },
    // enableAddon: true,
  },
  // addon: {
  //   name: "sample-uxp-addon.uxpaddon",
  // },
  icons: [
    {
      width: 48,
      height: 48,
      path: "icons/plugin.png",
      scale: [1, 2],
      theme: ["darkest", "dark", "medium", "lightest", "light", "all"],
      species: ["pluginList"],
    },
  ],
};

export const config: UXP_Config = {
  manifest,
  hotReloadPort: 8080,
};
