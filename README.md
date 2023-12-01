<img src="src/assets/bolt-uxp.svg" alt="Bolt CEP" title="Bolt CEP" width="400" />

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

## Prerequisites

- [Node.js 18](https://nodejs.org/en/) or later
- [Adobe UXP Developer Tool (aka UDT)](https://developer.adobe.com/photoshop/uxp/2022/guides/devtool/installation/)
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/) ( ensure by running `yarn set version classic` )

## Quickstart

`yarn create bolt-uxp` - Create new project

`cd project` - Create new project

`yarn` - Install Dependencies (if not already done by create command)

`yarn build` - Build the plugin (must run before `yarn dev`, can also run after for panel to work statically without the process)

`yarn dev` - Run the plugin in hot reload mode for development with UDT (see below)

`yarn ccx` - Build & Package the plugin as a CCX for delivery (separate CCX files for each host are generated due to
current UXP requirements)

`yarn zip` - Bundles your packaged ccx file(s) and specified assets from `copyZipAssets` to a zip archive in the `./zip` folder

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

## Multi-Window panels

To add additional windows to a UXP Plugin, you'll need to do 2 things:

1. Add an additional panel in the `uxp.config.ts` (see the settings example commented out)
2. Add a `<uxp-panel panelid="bolt.uxp.plugin.settings">` tag to your main entrypoint file (.tsx, .vue, or .svelte). Note that the `panelid` must match the panelid in the `uxp.config.ts` file.

Note: Unlike CEP Extensions which multi-panel extensions behave as separate isolated panels/websites, a multi-panel UXP plugin is all in 1 space with certain sections of the markup rendered in different panels (identified by the `<uxp-panel />` tag)

## Hybrid Plugin Development

UXP Hybrid Plugins allow you to write C++ functions and call them from UXP. This is useful for performance critical operations and accessing system methods not yet part of the UXP APIs.

Since Hybrid Plugins are application specific, you will need to compile the macOS binary with XCode on macOS and the Windows binary with Visual Studio 2019 on Windows. The hybrid plugin project files are located in `./src/hybrid`, and they compile to `./public-hybrid`, which ends up in `./dist/mac` and `./dist/pc` after build.

**Xcode Notes**

The Xcode project is designed to build a universal binary from an arm64 (M1, M2, M3) machine that works for both arm machines and x64 machines. If you are not on an arm machine, you will need to change the copy build settings to only build for x64, and note that your hybrid plugin will not work on arm machines.

**Visual Studio Notes**

The project is set up for Visual Studio 2019. A post-build action will copy the resulting `.uxpaddon` binary to the `./public-hybrid` folder. If you are using a different version of Visual Studio, you may need to update settings for this to work, but Adobe recommends 2019 currently.

**Build Scripts**

You can easily rebuild a binary from the commandline without opening XCode or Visual Studio with `yarn mac-build` and `yarn win-build`. You'll need to ensure msbuild for Windows and xcodebuild for MacOS are in your system's environment variables.

**Hot Reloading Notes**

While Bolt UXP supports hot reloading, this does not extend to the C++ Hybrid plugin portion of the project. If you only make changes to the frontend code, hot reloading will work as expected, however if you make changes to the MacOS or Windows binaries, you will see a warning in the console that you need to unload and load the plugin since the binaries are locked during debug. You can do this in UDT by selecting "Unload", building the binary, then selecting "Load" again.

Currently there is no way to automate this process in UDT, but we have requested that the Adobe UXP team add this feature.

**Additional Notes**

More info on Hybrid Plugins can be found here: https://developer.adobe.com/photoshop/uxp/2022/guides/hybrid-plugins/

Currently, hybrid plugins are only supported in Photoshop.

---

---

If you're interested in updating `bolt-uxp` core, please see the [./readme_dev.md](readme_dev.md)
