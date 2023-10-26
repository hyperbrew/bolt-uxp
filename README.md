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

1. Open the Adobe UXP Developer Tool
2. Click the `Add Plugin` button in the top right corner
3. Select the `manifest.json` file in the `dist` folder
4. Click the 3 dot menu to the right of the listed plugin and select `Load Plugin`
5. Click the 3 dot menu to the right of the listed plugin and select `Watch`
6. Click the 3 dot menu to the right of the listed plugin and select `More`
7. Type in the "assets" folder into the Plugin Bulid Folder field

## Hybrid Plugin Development

UXP Hybrid Plugins allow you to write C++ functions and call them from UXP. This is useful for performance critical operations and accessing system methods not yet part of the UXP APIs.

Since Hybrid Plugins are application specific, you will need to compile the macOS binary with XCode on macOS and the Windows binary with Visual Studio 2019 on Windows. The hybrid plugin project files are located in `src/hybrid`, and they compile to `public/hybrid`, which ends up in `dist/mac` and `dist/pc` after build.

More info on Hybrid Plugins can be found here: https://developer.adobe.com/photoshop/uxp/2022/guides/hybrid-plugins/

Currently, hybrid plugins are only supported in Photoshop.
