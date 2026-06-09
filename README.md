<img src="src/assets/bolt-uxp.svg" alt="Bolt UXP" title="Bolt UXP" width="400" />

A lightning-fast boilerplate for building Adobe UXP Plugins in Svelte, React, or Vue built on Vite + TypeScript + Sass

![npm](https://img.shields.io/npm/v/bolt-uxp)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/hyperbrew/bolt-uxp/blob/master/LICENSE)
[![Chat](https://img.shields.io/badge/chat-discord-7289da.svg)](https://discord.gg/PC3EvvuRbc)

## Features

- Lightning Fast Hot Reloading on changes
- Setup with TypeScript Definitions for UXP and Photoshop APIs
- Easily configure in uxp.config.ts
- Comes with multi-host-app configuration
- Optimized Build Size
- Template for UXP Hybrid C++ Plugins
- Easy Publish to CCX for Distribution
- Easy Package to ZIP archive with sidecar assets
- GitHub Actions ready-to-go for CCX Releases

## Backers

Huge thanks to our backers who have made this project possible!

<a href="https://aescripts.com/" target="_blank">
<img src="https://aescripts.com/media/wysiwyg/aescripts_aeplugins_Logo_Stack_300.png" alt="aescripts + aeplugins" title="aescripts + aeplugins" width="200" /></a>

If you're interested in supporting this open-source project, please [see our sponsor page](https://github.com/sponsors/hyperbrew).

## Support

### Free Support 🙌

If you have questions with getting started using Bolt UXP, feel free to ask and discuss in our free Discord community [Discord Community](https://discord.gg/PC3EvvuRbc).

### Paid Priority Support 🥇

If your team is interested in paid consulting or development with Bolt UXP, please [contact the Hyper Brew team](https://hyperbrew.co/contact/). More info on our [Adobe Plugin Development & Consulting Services](https://hyperbrew.co/landings/boost-development)

## Can I use Bolt UXP in my free or commercial project?

Yes! Bolt UXP is **100% free and open source**, being released under the MIT license with no attribution required. This means you are free to use it in your free or commercial projects.

We would greatly appreciate it if you could provide a link back to this tool's info page in your product's site or about page:

Bolt UXP Info Page Link: https://hyperbrew.co/resources/bolt-uxp

**Built with Bolt UXP** button graphics:

**PNG Files**

<div style="display:flex;gap:1rem;">
<a href="./src/assets/built-with-bolt-uxp/Built_With_BOLT_UXP_Logo_White_V01.png" target="_blank">
<img src="./src/assets/built-with-bolt-uxp/Built_With_BOLT_UXP_Logo_White_V01.png" width="200" /></a>

<a href="./src/assets/built-with-bolt-uxp/Built_With_BOLT_UXP_Logo_Black_V01.png" target="_blank">
<img src="./src/assets/built-with-bolt-uxp/Built_With_BOLT_UXP_Logo_Black_V01.png" width="200" /></a>

</div>

**SVG Files**

<div style="display:flex;gap:1rem;">
<a href="src/assets/built-with-bolt-uxp/Built_With_BOLT_UXP_Logo_White_V01.svg" target="_blank">
<img src="src/assets/built-with-bolt-uxp/Built_With_BOLT_UXP_Logo_White_V01.svg" width="200" /></a>

<a href="src/assets/built-with-bolt-uxp/Built_With_BOLT_UXP_Logo_Black_V01.svg" target="_blank">
<img src="src/assets/built-with-bolt-uxp/Built_With_BOLT_UXP_Logo_Black_V01.svg" width="200" /></a>

</div>

## Prerequisites

- [Node.js 18](https://nodejs.org/en/) or later
- [Adobe UXP Developer Tool (aka UDT)](https://developer.adobe.com/photoshop/uxp/2022/guides/devtool/installation/)
- Package manager either
  - NPM (comes with Node.js)
  - [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/) ( ensure by running `yarn set version classic` )
  - [PNPM](https://pnpm.io/installation) ( ensure by running `pnpm --version` )
- Git required for non-published packages
  - [Git] https://git-scm.com/

## Quick Start

<img src="src/assets/bolt-uxp-quickstart.gif" alt="Bolt UXP">

Create your new Bolt UXP project (follow CLI prompts)

- yarn - `yarn create bolt-uxp`
- npm - `npx create-bolt-uxp`
- pnpm - `pnpm create bolt-uxp`

Change directory to the new project

- `cd project`

Install Dependencies (if not already done by create command)

- yarn - `yarn`
- npm - `npm i`
- pnpm - `pnpm i`

(Webview UI Only) Install Webview Dependencies

- yarn - `cd webview-ui && yarn && cd ..`
- npm - `cd webview-ui && npm i && cd ..`
- pnpm - `cd webview-ui && pnpm i && cd ..`

Build the plugin (must run before `dev`, can also run after for panel to work statically without the process)

- yarn `yarn build`
- npm `npm run build`
- pnpm `pnpm build`

Run the plugin in hot reload mode for development with UDT (see below)

- yarn `yarn dev`
- npm `npm run dev`
- pnpm `pnpm dev`

Build & Package the plugin as a CCX for delivery (separate CCX files for each host are generated due to current UXP requirements)

- yarn `yarn ccx`
- npm `npm run ccx`
- pnpm `pnpm ccx`

Bundles your packaged ccx file(s) and specified assets from `copyZipAssets` to a zip archive in the `./zip` folder

- yarn `yarn zip`
- npm `npm run zip`
- pnpm `pnpm zip`

Install all CCX files possible in the CCX folder (must run `yarn ccx` prior)

- yarn `yarn ccx-install`
- npm `npm run ccx-install`
- pnpm `pnpm ccx-install`

Uninstall all installed UXP plugins matching manifest name

- yarn `yarn ccx-uninstall`
- npm `npm run ccx-uninstall`
- pnpm `pnpm ccx-uninstall`

## UDT Setup

_Install Note: The Adobe UXP Developer Tools (UDT) can be downloaded from the Adobe CC app_

### Add Plugin

1. Open the Adobe UXP Developer Tool (2.0 or later)
2. Click the `Add Plugin` button in the top right corner
3. Select the `manifest.json` file in the `dist` folder

### Load and Debug Plugin

1. Click `Load` button on your plugin item
2. Click `Debug` button on your plugin item

_Note: You only need to "Load" a plugin, do not use the "Load and Watch" feature. The bulit-in UDT file watcher aka "Load and Watch" does not reliably update on changes so we recommend avoiding it. Instead, Bolt UXP comes with it's own built-in WebSocket system to trigger a reload on each update which is more consistent and less error-prone._

## Install a Plugin

You can install your UXP plugin from CCX file in a number of ways:

### A. The ZXP / UXP Installer from aescripts + aeplugins

Download here: https://aescripts.com/learn/zxp-installer/ Simply drag and drop the CCX file onto the installer and follow the prompts.

### B. The Adobe CC App (UPIA under the hood)

As long as file associations are set up correctly, you can simply double click the CCX file to install it and you can follow the prompts in the Adobe CC app to complete the install

### C. UPIA or Unified Plugin Installer Agent (Adobe's UXP Plugin Installer)

You can install via the command line directly with the UPIA tool. Error codes are in the [documentation](https://helpx.adobe.com/creative-cloud/apps/troubleshoot/plugin-installation-issues/plugin-installation-errors-using-exman-or-upia.html).

Windows:

```
cd "C:\Program Files\Common Files\Adobe\Adobe Desktop Common\RemoteComponents\UPI\UnifiedPluginInstallerAgent"

UnifiedPluginInstallerAgent.exe /install /path/to/plugin.ccx
```

Mac:

```
cd "/Library/Application Support/Adobe/Adobe Desktop Common/RemoteComponents/UPI/UnifiedPluginInstallerAgent/UnifiedPluginInstallerAgent.app/Contents/MacOS"

./UnifiedPluginInstallerAgent --install /path/to/plugin.ccx
```

### Where are UXP Plugins Installed to?

The resulting directory can end up in any number of places depending on UPIA version and settings. This location is subject to change and managed by UPIA and the UXP database. In general do not modify or try to manipulate these locations or you will likely break the plugin.

Windows:

- `C:\Program Files\Common Files\Adobe\UXP\Plugins\<username>\External\`
- `C:\Users\<username>\AppData\Roaming\Adobe\UXP\Plugins\External\`

Mac:

- `/Users/<username>/Library/Application Support/Adobe/UXP/Plugins`

_Special Note_
You cannot write UXP plugins directly into the directories above like you could with CEP panels. UXP plugins must be installed via either double-click or UPIA in order to correctly update a database file.

## Debugging

Bolt UXP supports 2 different routes for debugging: UDT & VS Code

UDT is set as the default debugger, however you can change to VS Code in `uxp.config.ts`

```ts
const extraPrefs: UXP_Config_Extra = {
  [...]
  debugger: "udt", // 'udt' or 'vscode'
};
```

Note: You cannot debug in both at the same time you must pick one or the other. Upon switching debuggers, always unload the plugin from UDT and re-run `yarn build`, then you're free to follow the below instructions for the desired debugger.

### A: UDT (UXP Debugger Tool)

The default debugger is UDT aka the UXP Debugger Tool from Adobe. With the debugger set to `"udt"` in the config, all built JS files will be ready for line-by-line debugging in UDT. Follow the steps below to get started:

- Enable `debugger: "udt"` in the `uxp.config.ts`
- Run `yarn build` (at least once) and then run `yarn build` or `yarn dev` after
- Open UDT
  - Press "Load" to load the plugin
  - Press "Debug" top open the Dev Tools
  - Navigate to the "Sources" Tab
  - Find your source file in the "Page" sidebar treeview
  - Set a breakpoint in the desired line of code
  - Code will now halt on Breakpoints for line-by-line debugging in `build` or `dev` mode

**UDT Debugger Additional Details**

- UDT Debugger requires inline sourcemaps
- UDT Debugger requires `//# sourceURL=uxp-script://` to be appended to JS files

### B: VS Code (UXP Debugger by Jaroslav Bereza)

There is a 3rd party UXP Debugger for VS Code publised by Jaroslav Bereza. This tool does require patching UDT (e.g. modifying the program files) in order to function. You'll need admin access on your machine in order to do this.

- Install the VS Code UXP Debugger following the instructions here: https://marketplace.visualstudio.com/items?itemName=JaroslavBereza.uxpdebugger
- Once fully installed, enable `debugger: "vscode"` in the `uxp.config.ts`
- Run `yarn build` (at least once) and then run `yarn build` or `yarn dev` after
- Open UDT
  - Press "Load" to load the plugin (Note: Do not press "Debug", this will break the connection)
- Open VS Code
  - Press Sidebar > Debug > "Attach to UXP Plugin"
  - Set a breakpoint in the desired line of code
  - Code will now halt on Breakpoints for line-by-line debugging in `build` or `dev` mode

**VS Code Debugger Additional Details**

- VS Code Debugger config setup in `.vscode\launch.json`
- VS Code Debugger requires inline sourcemaps
- VS Code Debugger will not allow `//# sourceURL=uxp-script://` to be appended to JS files

## Supported Adobe Apps

Currently the following Adobe apps support UXP plugins:

- Photoshop
- InDesign
- Premiere Pro

If you have UXP Beta access to any of the other Adobe apps, you can add them as well, including:

- Illustrator (beta)
- After Effects (beta)
- Media Encoder (beta)

_Note: Bolt UXP will not work out of-the-box for apps in UXP beta, you will need beta access from Adobe app teams as they become available. Hyper Brew cannot assist you in this, you will need to contact Adobe app teams directly for access._

## Multi-Window panels

To add additional windows to a UXP Plugin, you'll need to do 2 things:

1. Add an additional panel in the `uxp.config.ts` (see the settings example commented out)
2. Add a `<uxp-panel panelid="bolt.uxp.plugin.settings">` tag to your main entrypoint file (.tsx, .vue, or .svelte). Note that the `panelid` must match the panelid in the `uxp.config.ts` file.

Note: Unlike CEP Extensions which multi-panel extensions behave as separate isolated panels/websites, a multi-panel UXP plugin is all in 1 space with certain sections of the markup rendered in different panels (identified by the `<uxp-panel />` tag)

## Webview UI Option

_⚠️ Webview UI is currently in Beta_

Bolt UXP now comes with the option of enabling a Webview UI when you create a new project.

If you are new to UXP, we recommend you leaving the Webview option disabled as it adds to the complexity of your project.

Enabling the Webview UI option now allows you to build your User Interface with full CSS/HTML/JS DOM support following Edge on Windows and Safari on MacOS.

Webview UI option **must** be enabled during the `create bolt-uxp` script setup to copy the correct files.

Enabling Webview UI will however add to the complexity of your project creating 2 separate contexts for:

- UI >> `webview-ui/*`
- UXP Backed >> `src/*`

All Exported Functions in your uxp and app files are exposed to the Webview:

- `src/api/uxp.ts` - Global Functions
- `src/api/(photoshop/indesign/premierepro/etc).ts` - App-Specific Functions

In the Webview context, you can call these async methods and get responses with type-safety with the `api` object:

**Call UXP Functions from Webview**

```js
await api.getProjectInfo();
await api.getUXPInfo();
```

In a similar way, you can write functions in the webview context that get called by the UXP context by writing:

- `webview-ui/src/webview-api.ts` - Webview functions exposed to UXP

**Call Webview Functions from UXP**

```js
webviewAPIs = await webviewInitHost({ multi: true });
[mainWebviewAPI] = webviewAPIs;

await mainWebviewAPI.pingWebview();
```

Since the Webview and UXP are separate contexts, make sure to only return primative types (strings, numbers, booleans, arrays, static objects, etc). Any references or object instances returned will not be preserved.

## Webview UI - Debugging

The Webview UI option will create 2 separate JS contexts, UXP & Webview UI.

- **UXP Context:** Debug with the Adobe UXP Developer Tools
- **Webview UI Context:** Debug with webview devtools with right click > "Inspect" on the UI
  - _Note: this context menu can be overridden in production if desired_

## Webview UI - Multi Panel Plugins

If you want to use Webview mode with multi-panel plugins, first follow the steps in [Multi-Window panels](#multi-window-panels) to setup the uxp.config.ts and add the `<uxp-panel />` element for secondary panels.

Run build again and reload your UXP plugin.

Ensure `webviewInitHost({ multi: true });` is enabled

Now when you build, webviews will be created and override your UI for each secondary panels in your config.

Comlink Origin Warnings in the console are normal and can be ignored, this is just to prevent duplicate events.

To call different APIs in different webviews, you can deconstruct the `webviewAPIs` array in order of panels listed in the `uxp.config.ts`

```js
const [mainWebviewAPI, settingsWebviewAPI] = webviewAPIs;
mainWebviewAPI.doThisFunction();
settingsWebviewAPI.doThatFunction();
```

In your Webview UI, you can conditionally render UI for different windows with the `page` variable from the `initWebview()` function.

```js
import { initWebview } from "./webview-setup";
const { api, page } = initWebview(webviewAPI);
page; // e.g. 'main' | 'settings'
```

## Webview UI - How Does it Work?

In `dev` mode, a separate Vite server is spun up for the Webview UI Frontend. The webview element in UXP is aimed at that localhost port.

When `build` is run, the webview first builds to a single `index.html` source, then copied into individual HTML files per panel (e.g. `main.html` and `settings.html`) file in the `public/webview-ui` directory which is then copied to `dist`.

Fast communication between UXP and Webview contexts is accomplished via [Comlink](https://github.com/GoogleChromeLabs/comlink) interface over the `postMessage()` APIs with full type-safety between contexts.

## App Color Schemes

UXP implements [Global CSS Variables](https://developer.adobe.com/photoshop/uxp/2022/guides/theme-awareness/) in order to use the app's color scheme. Currently Photoshop has full support, while support is pending with [InDesign](https://forums.creativeclouddeveloper.com/t/theme-awareness-css-variables-indesign/8287/9) and [Premiere Pro](https://forums.creativeclouddeveloper.com/t/theme-colors-for-premiere-pro-uxp/11586) support.

Bolt UXP accurately polyfills Color Variables per os, app, and selected theme (e.g. light, dark, lightest, darkest), in both UXP and Webview UI.

You can use the following 10 CSS variables to make your panel match the host app:

```css
--uxp-host-background-color
--uxp-host-text-color
--uxp-host-border-color
--uxp-host-link-text-color
--uxp-host-widget-hover-background-color
--uxp-host-widget-hover-text-color
--uxp-host-widget-hover-border-color
--uxp-host-text-color-secondary
--uxp-host-link-hover-text-color
--uxp-host-label-text-color
```

You can add additional CSS rules depending on theme in the following 2 ways depending on if your UXP plugin uses Webview or Vanilla UXP:

**UXP Reactive Colors:**

```css
@media (prefers-color-scheme: dark) {
}
@media (prefers-color-scheme: darkest) {
}
@media (prefers-color-scheme: light) {
}
@media (prefers-color-scheme: lightest) {
}
```

**Webview UI Reactive Colors:**

```css
:root[data-theme="light"] {
}
:root[data-theme="lightest"] {
}
:root[data-theme="dark"] {
}
:root[data-theme="darkest"] {
}
```

_Note: Do not use `prefers-color-scheme` on Webview as it will use the system's color scheme which may not always match the app's color scheme._

## GitHub Actions CCX Releases

This repo comes with a configured GitHub Action workflow to build a CCX and add to the releases each time a git tag is added.

```
git tag 1.0.0
git push origin --tags
```

Then your new build will be available under GitHub Releases. For more info, see the [YML config](.github\workflows\main.yml)

## Copy Zip Assets

If you have assets that you would like copied with your ccx into a zip archive for delivery, you can add the optional `copyZipAssets:[]` array inside your `uxp.config.ts` to include files or entire folders. A folder ending in "/\*" will copy the contents without the folder structure into the zip destination.

```js
  copyZipAssets: ["public-zip/*"],
```

### A Note on IDs for Multi-App UXP Plugins

Currently while a UXP plugin manifest can have multiple hosts in dev mode (loaded via UDT), it cannot have multiple hosts once built to a CCX. Multiple CCX files are needed, one per app.

Additionally, since all UXP Plugin IDs have to be unique, this can cause a clash unless otherwise hanlded.

In version `1.2.5` and onward, the default behavior is to build UXP plugins with unique IDs per host app at build time.

This can result in duplicate installs if you started your UXP plugin prior to version `1.2.5` so if you would like to keep your current ID to avoid the need for users to uninstall before installing a new version, you can opt-out of the new behavior with the optional property `uniqueIds: false` in the `uxp.config.ts`

## Hybrid Plugin Development

UXP Hybrid Plugins allow you to write C++ functions and call them from UXP. This is useful for performance critical operations and accessing system methods not yet part of the UXP APIs.

If you enabled the Hybrid Plugin option during the `yarn create bolt-uxp` process, your project will come with already compiled binaries, and project files if you want to make your own customizations to the Hybrid Plugin.

Since Hybrid Plugins are application specific, you will need to compile the macOS binary with XCode on macOS and the Windows binary with Visual Studio 2019 on Windows. The hybrid plugin project files are located in `./src/hybrid`, and they compile to `./public-hybrid`, which ends up in `./dist/mac` and `./dist/pc` after build. The structure required is as follows:

```
root
 ├─ mac
 │   ├─ arm64
 |      └─ bolt-uxp-hybrid.uxpaddon
 |   └─ x64
 |      └─ bolt-uxp-hybrid.uxpaddon
 └─ win
     └─ x64
        └─ bolt-uxp-hybrid.uxpaddon
```

Supported platforms include:

- MacOS x64
- MacOS arm64
- Windows x64
- Windows arm64 (debug only)
  - You can build and debug UXP Hybrid Plugins on Windows ARM devices with Bolt and by copying UDT from an x64 machine, however since Hybrid Plugins have not been officially supported on WinARM by Adobe, no installation method exists for final build CCX files. Only loading in UDT will work until full support arrives from Adobe for WinARM.
  - For CCX on WinARM, you can manually rename your .ccx to .zip, extract the contents, and move it to the following folder, however this installation method is unsupported and could change without notice so it's not recommended for production:
    - C:\Users\<username>\AppData\Roaming\Adobe\UXP\Plugins\External

(note that Windows arm64 for Hybrid Plugins is not currently supported by Adobe UXP applications)

### What's in the Current Hybrid Plugin?

The current Hybrid Plugin comes with 2 functions:

- `execSync()` which works like Node.js's `child_process.execSync()` function. It synchronously accepts a string a string and returns the output of the command. This is useful for running system commands and getting the output back to your UXP plugin, which is currently not possible via the UXP APIs.

- `exec()` which works like Node.js's `child_process.exec()` function, except it is promise-based rather than callback based. It is a non-blocking asynchronous function that accepts a string a string and resolves the output of the command. This is useful for running system commands which take longer without blocking the app UI or plugin UI. This is also not currently possible via the UXP APIs.

### Xcode Notes

The Xcode project is designed to build a universal binary from an arm64 (M1, M2, M3) machine that works for both arm machines and x64 machines. If you are not on an arm machine, you will need to change the copy build settings to only build for x64, and note that your hybrid plugin will not work on arm machines.

### Xcode Debugging

To debug a Photoshop Hybrid Plugin in Xcode, you'll need to create a copy of the app with modifications and then you can run and attach to the process.

This article explains the problem, but the solution script is outated: https://helpx.adobe.com/photoshop/kb/debug-plugins-in-photoshop-bigsur.html

Instead, follow the steps below:

_Requires an Apple Developer ID certificate installed on the machine_

**1. Create a dev version of Photoshop**

1.1 Make a copy of the application: "/Applications/Adobe Photoshop 2026/Adobe Photoshop 2026.app" to "/Applications/Adobe Photoshop 2026/Adobe Photoshop 2026-dev.app"
1.2 Create an `entitlements.xml` file with `codesign -d --entitlements :- '/Applications/Adobe Photoshop 2026-developer/Adobe Photoshop 2026.app'  > entitlements.xml`
1.3 Ensure the XML file is not saved inside the `.app` package
1.4 Add the following line to the XML file: `<key>com.apple.security.get-task-allow</key> <true/>`
1.5 Save the `entitlements.xml` file
1.6 Validate the XML file with: `plutil -convert xml1 entitlements.xml `
1.7 Re-apply the codesign with `sudo codesign --force --deep --options runtime --entitlements '/Applications/Adobe Photoshop 2026/entitlements.xml' --sign "Developer ID Application: NAME_OF_COMPANY_CERT" "/Applications/Adobe Photoshop 2026/Adobe Photoshop 2026-dev.app"

**2. Debug and Attach to the Process**

2.1 (once) Fill out all Apple Signing Credentials in `.env` including APPLE_ID, APPLE_TEAM_ID, APPLE_PASSWORD, APPLE_SIGNING_IDENTITY
2.2 Launch `Adobe Photoshop 2026-dev.app` from previous step
2.3 Disconnect UXP Plugin from host app in UDT
2.4 `yarn mac-build-debug` - Build the hybrid plugin in debug mode
2.5 `yarn mac-sign` - Sign and notorize the hybrid plugin
2.6 `yarn build` - Build the project including copying hybrid files
2.7 Attach UXP plugin to host app in UDT
2.8 In Xcode run Debug > Attach to Process > Adobe Photoshop 2026 (or equivalent app)

Now you can set breakpoints and debug your Hybrid Plugin in Xcode. After making changes to your Hybrid Plugin C++ code, repeat steps 2.3 - 2.8

_Note: Once completed with debugging, always build Hybrid Binaries in standard release mode with `yarn mac-build`_

### Visual Studio Notes

The project is set up for Visual Studio 2019. A post-build action will copy the resulting `.uxpaddon` binary to the `./public-hybrid` folder. If you are using a different version of Visual Studio, you may need to update settings for this to work, but Adobe recommends 2019 currently.

### Visual Studio Debugging

To debug your Hybrid Plugin in Visual Studio, follow the steps below:

1. (once) Configure Visual Studio
   1.1 Project Menu > bolt-uxp-hybrid Properties
   1.2 Config: Debug
   1.3 Configuration Properties > Debugging
   1.4 Command `C:\Program Files\Adobe\Adobe Photoshop 2026\Photoshop.exe` (or path to targeted host app)
2. Close target app if running
3. `yarn win-build-debug` - Build the hybrid plugin in debug mode
4. `yarn build` - Build the project including copying hybrid files
5. Select `Debug > Start Debugging` in Visual Studio
6. Attach UXP plugin to host app in UDT

Now you can set breakpoints and debug your Hybrid Plugin in Visual Studio. After making changes to your Hybrid Plugin C++ code, repeat steps 2 - 6

_Note: Once completed with debugging, always build Hybrid Binaries in standard release mode with `yarn win-build`_

### Hybrid Build Scripts

You can easily rebuild a binary from the command line without opening XCode or Visual Studio with `yarn mac-build` and `yarn win-build`. You'll need to ensure msbuild for Windows and xcodebuild for MacOS are in your system's environment variables.

Alternatively, you can build debug builds with `yarn win-build-debug` in order to attach to the process and debug your C++ code with breakpoints, however make sure to build a release version for distribution, otherwise your users will experience a `Failed to load Addon: The specified module could not be found` error when your users without a dev environment try to load your plugin.

### Do I need to Sign and Notorize my UXP Plugins?

The current UXP Hybrid binaries (.uxpaddon files) come signed and notorized for MacOS and signed for Windows, however if you make modifications to the C++ source code and compile again, you will need to sign and notorize with your own certs for MacOS and Windows. Instructions for signing and notorizing are below:

### Sign and Notorize on MacOS

MacOS requires your hybrid plugins to be signed and notorized when shipped to users.

Requirements:

- Apple Developer Account
- Developer ID Certificate
- Latest Xcode installed
- Xcode Command Line Tools installed

Once these are set up, duplicate the .env.example file to a .env file and fill out all fields with your Apple credentials.

Install your cert locally, and ensure your signing settings in XCode are set to that certificate for both arm64 and x64.

Ensure you are logged into your correct Apple account in XCode.

Finally run `yarn-build-sign` to both build your mac binary and sign it. This will also notorize the binary with Apple's servers which can take several minutes.

More details on how the signing and notorization process works can be found in the `scripts/mac-sign.js` file.

### Sign on Windows

Windows does not require signing, however it's generally a good idea to avoid any warning popups or Windows silently blocking your plugin. A script is provided to sign your Windows binary with an EV cert hosted via Azure. Once you have a cert purchased and hosted with Azure, you'll need to fill out the .env file with your Azure credentials.

Once your cert hosting is set up and your .env file is filled out, you can run `yarn win-sign` to sign your Windows binary.

### Hot Reloading Hybrid Plugins

While Bolt UXP supports hot reloading, this does not extend to the C++ Hybrid plugin portion of the project. If you only make changes to the frontend code, hot reloading will work as expected, however if you make changes to the MacOS or Windows binaries, you will see a warning in the console that you need to unload and load the plugin since the binaries are locked during debug. You can do this in UDT by selecting "Unload", building the binary, then selecting "Load" again.

Currently there is no way to automate this process in UDT, but we have requested that the Adobe UXP team add this feature.

### Additional Notes

More info on Hybrid Plugins can be found here: https://developer.adobe.com/photoshop/uxp/2022/guides/hybrid-plugins/

Currently, hybrid plugins are only supported in Photoshop, InDesign, and Premiere.

---

### Handling Global Errors

Adobe UXP does not currently have a global event handler. This means that any errors not handled in a try/catch will be silently ignored, which can make projects hard to debug.

Adobe is working on adding the global event handler (e.g. `window.onError()`) but in the meantime, Bolt UXP ships with a polyfill. While it's impossible to polyfill catching unhanlded errors on the developer side, the following functions make handling errors easier, especially when integrating services like Sentry to track errors on the user side.

_Note: This does not apply Webview, only to the UXP portion of your plugin. Webview global error handler works as expected and does not need polyfilling._

`src\api\errors.ts`

**1. Error Handler** - `polyFillGlobalErrorHandler()`

First step is the error handler. This function polyfills `window.onerror()`. You can easily append any other logging or handling such as Sentry hooks to integrate other error handling services in this function.

**2. Throw Error** - `throwErr()`

While the keyword `throw` is of course reserved, you can instead use this function to trigger the global error handler anywhere in your UXP plugin.

**3. Run Safely** - `safe()` & `safeAsync()`

To make handling errors easier, you can wrap any error-prone function into `safe()` for synchronous functions or `safeAsync()` for asynchronous functions. Errors will be caught and sent to the global event handler. The result or an error will be returned. You can handle the error by checking the instanceof the value.

**Sync Example**

```ts
const res = safe(() => window.notExist()); // error is sent to global error handler
if (res instanceof Error) {
  return console.log("there was an error"); // also handle error in-context
}
console.log("all good");
```

**Async Example**

```ts
const res = await safeAsync(async () => window.notExist()); // error is sent to global error handler
if (res instanceof Error) {
  return console.log("there was an error"); // also handle error in-context
}
console.log("all good");
```

---

### Notes on Spectrum

There are several flavors of Adobe Spectrum:

- Spectrum CSS
- React Spectrum
- Spectrum Web Components
- Spectrum UXP

Recently the Adobe UXP team is moving away from the built-in Spectrum UXP to Spectrum Web Components.

Since this move is recent, and compatibility is pending, Bolt UXP doesn't come set up for any Spectrum integration, however if you'd like you can add it yourself.

**Spectrum UXP**

You can use native Spectrum UXP widgets without any extra dependencies, however you will recieve TypeScript errors. To remove these errors you'll need to add defs for spectrum in your `globals.d.ts` file per your framework (React example below)

React Example for `<sp-heading />`

```ts
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "sp-heading": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}
```

More info on Spectrum UXP: https://developer.adobe.com/xd/uxp/uxp/reference-spectrum/

**Spectrum Web Components**

For Spectrum Web Components, you'll need to add the dependency from npm and import the components into your project as needed. Follow the guide here:

https://www.npmjs.com/package/@spectrum-web-components/bundle

## Misc Troubleshooting

- **Update a Bolt UXP Project** To update an existing Bolt UXP project to the the latest version, create a new Bolt UXP project with the same framework (React, Vue, Svelte) and host apps, then compare and update the following files:

  1. `package.json` - Update all dependencies and scripts ( `vite-uxp-plugin` - usually contains the most frequent updates )
  2. `vite.config.ts` - Unless you've modified the vite config yourself, you can just copy the contents of the latest into yours.
  3. `uxp.config.ts` - Check if any new properties have been added that don't exist in your config.
  4. `src/api` - Update this entire folder.
  5. `src/hybrid` - Update this entire folder unless you've made modifications to the C++ code.
  6. `src/lib` - Update this entire folder unless you've made modifications to the library files.

- **Why are CSS rules not working / HTML widgets broken / JavaScript DOM methods missing?**
  UXP is not a browser, it is a subset of web standards built from the ground-up by Adobe. This means many features in CSS/HTML/JS that work in the browser will not work in UXP. This includes many CSS rules, HTML elements, and JavaScript methods. If you find something that is not working, please check the [Adobe UXP documentation](https://developer.adobe.com/photoshop/uxp/2022/uxp-api/) to see if it is supported.

- **Can I get full browser UI in UXP with a Webview?**
  It is possible to build a UXP panel will the entire UI built inside a webview. While this will create 2 separate contexts, a Webview Frontend and UXP backend, you can use the same CSS/HTML/JS features you would per OS (Edge on Windows, Safari on MacOS) This will require a separte build system for the frontend, and you'll need to build to a single HTML file if you're not hosting the backend with a Hybrid Plugin.
  For more details on this process, view the UXP Webview docs [here](https://developer.adobe.com/photoshop/uxp/2022/uxp-api/reference-js/Global%20Members/HTML%20Elements/HTMLWebViewElement/).

## Additional UXP Resources

**Official Docs**

- Photoshop UXP: [https://developer.adobe.com/photoshop/uxp/2022/](https://developer.adobe.com/photoshop/uxp/2022/)
- InDesign UXP: [https://developer.adobe.com/indesign/uxp/](https://developer.adobe.com/indesign/uxp/)
- Premiere Pro UXP: [https://developer.adobe.com/premiere-pro/uxp](https://developer.adobe.com/premiere-pro/uxp)

**Forums**

- Official Adobe UXP Forums: [https://forums.creativeclouddeveloper.com/](https://forums.creativeclouddeveloper.com/)
- Official UXP Forums: [https://forums.creativeclouddeveloper.com/](https://forums.creativeclouddeveloper.com/)

**Developer Tools**

- Adobe UXP Developer Tool Overview [https://developer.adobe.com/photoshop/uxp/2022/guides/devtool/](https://developer.adobe.com/photoshop/uxp/2022/guides/devtool/)
- Alchemist by Jarda for BatchPlay in Photoshop UXP [https://github.com/jardicc/alchemist](https://github.com/jardicc/alchemist)
- UXP Validator for VS Code by Jarda [https://github.com/jardicc/vscode-uxp-validator](https://github.com/jardicc/vscode-uxp-validator)

---

---

If you're interested in updating `bolt-uxp` core, please see the [./readme_dev.md](readme_dev.md)
