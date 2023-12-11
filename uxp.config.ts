import { UXP_Manifest, UXP_Config } from "vite-uxp-plugin";
import { version } from "./package.json";

const extraPrefs = {
  hotReloadPort: 8080,
  copyZipAssets: ["public-zip/*"],
};

const manifest: UXP_Manifest = {
  id: "bolt.uxp.plugin",
  name: "Bolt UXP",
  version,
  main: "index.html",
  manifestVersion: 6,
  host: [
    // BOLT-UXP_PHOTOSHOP_START
    {
      app: "PS",
      minVersion: "24.2.0",
    },
    // BOLT-UXP_PHOTOSHOP_END
    // BOLT-UXP_INDESIGN_START
    {
      app: "ID",
      minVersion: "18.5",
    },
    // BOLT-UXP_INDESIGN_END
    // BOLT-UXP_PREMIEREPRO_START
    {
      app: "premierepro",
      minVersion: "22.3",
    },
    // BOLT-UXP_PREMIEREPRO_END
    // BOLT-UXP_ILLUSTRATOR_START
    {
      app: "AI",
      minVersion: "18.5",
    },
    // BOLT-UXP_ILLUSTRATOR_END
  ],
  entrypoints: [
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

    // BOLT-UXP_SAMPLECODE_START

    // * Example of a UXP Secondary panel
    // * Must also enable the <uxp-panel panelid="bolt.uxp.plugin.settings">
    //* tag in your entrypoint (.tsx, .vue, or .svelte) file
    // {
    //   type: "panel",
    //   id: "bolt.uxp.plugin.settings",
    //   label: {
    //     default: "Bolt UXP Settings",
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

    // BOLT-UXP_SAMPLECODE_END
  ],
  requiredPermissions: {
    localFileSystem: "fullAccess",
    launchProcess: {
      schemes: ["https", "slack", "file", "ws"],
      extensions: [".xd", ".psd", ".bat", ".cmd"],
    },
    network: {
      domains: [
        // BOLT-UXP_SAMPLECODE_START
        "https://hyperbrew.co",
        "https://github.com",
        "https://vitejs.dev",
        "https://svelte.dev",
        "https://reactjs.org",
        "https://vuejs.org/",
        // BOLT-UXP_SAMPLECODE_END
        `ws://localhost:${extraPrefs.hotReloadPort}`, // Required for hot reload
      ],
    },
    clipboard: "readAndWrite",
    webview: {
      allow: "yes",
      domains: ["https://*.hyperbrew.co"],
    },
    ipc: {
      enablePluginCommunication: true,
    },
    allowCodeGenerationFromStrings: true,

    enableAddon: true, // BOLT-UXP_HYBRID_ONLY
  },
  // BOLT-UXP_HYBRID_START
  addon: {
    name: "bolt-uxp-hybrid.uxpaddon",
  },
  // BOLT-UXP_HYBRID_END
  icons: [
    {
      width: 24,
      height: 24,
      path: "icons/plugin.png",
      scale: [1, 2],
      theme: ["all"],
      species: ["pluginList"],
    },
  ],
};

export const config: UXP_Config = {
  manifest,
  ...extraPrefs,
};
