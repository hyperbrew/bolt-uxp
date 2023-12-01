# Core Bolt UXP Dev Guide

## Monorepo Overview

### Purpose of `bolt-uxp`

The `bolt-uxp` package is both the root folder of the monorepo and an npm package in itself to be used by the `create-bolt-uxp` package.

### Purpose of `create-bolt-uxp`

The `create-bolt-uxp` package is a CLI tool that is used to create a new project from the `bolt-uxp` template.

### Purpose of `vite-uxp-plugin`

The `vite-uxp-plugin` package is a Vite plugin that brings all the features needed for building UXP Plugins with Bolt UXP.

## Dev Quickstart

If you'd like to develop the core templates of Bolt UXP in order to contribute by submitting a PR, you can do so by following these steps:

- Clone the repo
- Run `yarn` to install dependencies
- Run `yarn dev` to start the dev server

To test the different frameworks (React, Vue, Svelte), enable the corresponding `<script />` tag in `index.html` and disable the others.

## How Templating Works

Root directory is in the main `bolt-uxp` folder.

`package.json` for the framework is copied and renamed to `package.json` in the root directory (e.g. `package.react.json`)

File includes and excludes for each template can be found in `create-bolt-uxp/src/data.ts`

All code sections:

- between: `// BOLT-UXP_VARIABLE_START` and `// BOLT-UXP_VARIABLE_END` or `<!-- BOLT-UXP_VARIABLE_START -->` and `<!-- BOLT-UXP_VARIABLE_END -->`
- before: `// BOLT-UXP_VARIABLE_ONLY`

Are removed if the variable doesn't match the framework (e.g. React, Vue, Svelte), app (e.g. PhotoShop, InDesign, etc.), or feature (e.g. Hybrid) selected.

_Note: Swap `VARIABLE` with the variable name (e.g. `// BOLT-UXP_REACT_ONLY`, `// BOLT-UXP_PHOTOSHOP_ONLY`, etc.)_

## How to publish changes:

1. If `vite-uxp-plugin` has any changes, update and publish in npm

2. If `bolt-uxp` has any changes, update and publish in npm (include latest `vite-uxp-plugin` version in the `package.json` file)

3. If `create-bolt-uxp` has any changes, update and publish in npm (include latest `bolt-uxp` version in the `package.json` file)
