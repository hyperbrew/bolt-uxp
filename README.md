# Bolt UXP

## Prerequisites

- Node.js 18 or later
- Adobe UXP Developer Tool
- yarn classic

## Quickstart

1. `yarn` - Install Dependencies
2. `yarn dev` - Run the plugin in hot reload mode for development with UDT (see below)
3. `yarn build` - Build the plugin
4. `yarn ccx` - Build & Package the plugin as a CCX for delivery (separate CCX files for each host are generated due to current UXP requirements)

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

## Hybrid Plugin Development

UXP Hybrid Plugins allow you to write C++ functions and call them from UXP. This is useful for performance critical operations and accessing system methods not yet part of the UXP APIs.

Since Hybrid Plugins are application specific, you will need to compile the macOS binary with XCode on macOS and the Windows binary with Visual Studio 2019 on Windows. The hybrid plugin project files are located in `src/hybrid`, and they compile to `public/hybrid`, which ends up in `dist/mac` and `dist/pc` after build.

More info on Hybrid Plugins can be found here: https://developer.adobe.com/photoshop/uxp/2022/guides/hybrid-plugins/

Currently, hybrid plugins are only supported in Photoshop.

## Multi-Window panels

To add additional windows to a UXP Plugin, you'll need to do 2 things:

1. Add an additional panel in the `uxp.config.ts` (see the settings example commented out)
2. Add a `<uxp-panel panelid="bolt.uxp.plugin.settings">` tag to your main entrypoint file (.tsx, .vue, or .svelte). Note that the `panelid` must match the panelid in the `uxp.config.ts` file.

Note: Unlike CEP Extensions which multi-panel extensions behave as separate isolated panels/websites, a multi-panel UXP plugin is all in 1 space with certain sections of the markup rendered in different panels (identified by the `<uxp-panel />` tag)
