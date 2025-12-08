import { UXP_Manifest, UXP_Config } from "vite-uxp-plugin";
import { version } from "./package.json";

const extraPrefs = {
  hotReloadPort: 8080,
  // BOLT_WEBVIEW_START
  // webviewUi: true,
  webviewReloadPort: 8082,
  // BOLT_WEBVIEW_END
  copyZipAssets: ["public-zip/*"],
  uniqueIds: true,
};

export const id = "bolt.uxp.plugin"; // BOLT_ID_REPLACE
const name = "Bolt UXP"; // BOLT_DISPLAYNAME_REPLACE

const manifest: UXP_Manifest = {
  id,
  name,
  version,
  main: "index.html",
  manifestVersion: 6,
  host: [
    // BOLT_PHXS_START
    {
      app: "PS",
      minVersion: "24.2.0",
    },
    // BOLT_PHXS_END
    // BOLT_IDSN_START
    {
      app: "ID",
      minVersion: "18.5",
    },
    // BOLT_IDSN_END
    // BOLT_PPRO_START
    {
      app: "premierepro",
      minVersion: "22.3",
    },
    // BOLT_PPRO_END
    // BOLT_ILST_START
    {
      app: "AI",
      minVersion: "18.5",
    },
    // BOLT_ILST_END
  ],
  entrypoints: [
    {
      type: "panel",
      id: `${id}.main`,
      label: {
        default: name,
      },
      minimumSize: { width: 230, height: 200 },
      maximumSize: { width: 2000, height: 2000 },
      preferredDockedSize: { width: 230, height: 300 },
      preferredFloatingSize: { width: 450, height: 400 },
      icons: [
        {
          width: 23,
          height: 23,
          path: "icons/dark.png",
          scale: [1, 2],
          theme: ["darkest", "dark", "medium"],
        },
        {
          width: 23,
          height: 23,
          path: "icons/light.png",
          scale: [1, 2],
          theme: ["lightest", "light"],
        },
      ],
    },

    // BOLT_SAMPLECODE_START

    // * Example of a UXP Secondary panel
    // * Must also enable the <uxp-panel panelid="bolt.uxp.plugin.settings">
    //* tag in your entrypoint (.tsx, .vue, or .svelte) file
    // {
    //   type: "panel",
    //   id: `${id}.settings`,
    //   label: {
    //     default: `${name} Settings`,
    //   },
    //   minimumSize: { width: 230, height: 200 },
    //   maximumSize: { width: 2000, height: 2000 },
    //   preferredDockedSize: { width: 230, height: 300 },
    //   preferredFloatingSize: { width: 230, height: 300 },
    //   icons: [
    //     {
    //       width: 23,
    //       height: 23,
    //       path: "icons/dark-panel.png",
    //       scale: [1, 2],
    //       theme: ["darkest", "dark", "medium"],
    //       species: ["chrome"],
    //     },
    //     {
    //       width: 23,
    //       height: 23,
    //       path: "icons/light-panel.png",
    //       scale: [1, 2],
    //       theme: ["lightest", "light"],
    //       species: ["chrome"],
    //     },
    //   ],
    // },

    // * Example of a UXP Command
    // {
    //   type: "command",
    //   id: "showAbout",
    //   label: {
    //     default: "Bolt UXP Command",
    //   },
    // },

    // BOLT_SAMPLECODE_END
  ],
  featureFlags: {
    enableAlerts: true,
  },
  requiredPermissions: {
    localFileSystem: "fullAccess",
    launchProcess: {
      schemes: ["https", "slack", "file", "ws"],
      extensions: [".xd", ".psd", ".bat", ".cmd", ""],
    },
    network: {
      domains: [
        // BOLT_SAMPLECODE_START
        "https://hyperbrew.co",
        "https://github.com",
        "https://vitejs.dev",
        "https://svelte.dev",
        "https://reactjs.org",
        "https://vuejs.org/",
        // BOLT_SAMPLECODE_END
        `ws://localhost:${extraPrefs.hotReloadPort}`, // Required for hot reload
      ],
    },
    clipboard: "readAndWrite",
    webview: {
      allow: "yes",
      allowLocalRendering: "yes",
      domains: "all",
      enableMessageBridge: "localAndRemote",
    },
    ipc: {
      enablePluginCommunication: true,
    },
    allowCodeGenerationFromStrings: true,

    enableAddon: true, // BOLT_HYBRID_ONLY
  },
  // BOLT_HYBRID_START
  addon: {
    name: "bolt-uxp-hybrid.uxpaddon",
  },
  // BOLT_HYBRID_END
  icons: [
    {
      width: 48,
      height: 48,
      path: "icons/plugin-icon.png",
      scale: [1, 2],
      theme: ["darkest", "dark", "medium", "lightest", "light", "all"],
      species: ["pluginList"],
    },
  ],
};

export const config: UXP_Config = {
  manifest,
  ...extraPrefs,
};
