# bolt-uxp-utils

A helper library for building UXP plugins for **Adobe Premiere Pro** and **Photoshop**.

## Status

Active development. Current helper count:

- **Premiere Pro** - 34 helpers
- **Photoshop** - 3 helpers

## Pick your path

There are two ways to use this library, depending on how your plugin is built:

| Your plugin uses…                                            | Use this path                                                |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| A bundler (Bolt UXP, Vite, Webpack, esbuild, etc.)           | **[Path A - with a bundler](#path-a--with-a-bundler)**       |
| Plain UXP plugin created with UXP Developer Tool, no bundler | **[Path B - without a bundler](#path-b--without-a-bundler)** |

Not sure? If you have a `vite.config.ts`, `webpack.config.js`, or your project was created with Bolt UXP, you're on **Path A**. Otherwise you're on **Path B**.

---

## Path A - with a bundler

### Install

```sh
npm install bolt-uxp-utils
```

> If your project was created with Bolt UXP, the required UXP type packages (`@adobe/premierepro`, `@types/photoshop`, `@adobe/cc-ext-uxp-types`) are already included - no extra install needed.
>
> If you're starting from scratch, install them yourself:
>
> ```sh
> npm install --save-dev @adobe/cc-ext-uxp-types @adobe/premierepro @types/photoshop
> ```

### Usage:

Three equivalent import styles, pick whichever fits your code style

Named imports:

```ts
//Premiere Pro
import { getActiveRoot, cloneSequence, forEachClip } from "bolt-uxp-utils/ppro";

const root = await getActiveRoot();
```

```ts
//photoshop
import { asModal, deselectAllLayers } from "bolt-uxp-utils/ps";

await asModal("My Command", async () => {
  await deselectAllLayers();
});
```

Default import (namespace style):

```ts
//Premiere Pro
import bolt from "bolt-uxp-utils/ppro";

const root = await bolt.getActiveRoot();
```

```ts
//photoshop
import bolt from "bolt-uxp-utils/ps";

await bolt.asModal("My Command", async () => {
  await bolt.deselectAllLayers();
});
```

Namespace import:

```ts
//Premiere Pro
import * as bolt from "bolt-uxp-utils/ppro";

const root = await bolt.getActiveRoot();
```

```ts
//photoshop
import * as bolt from "bolt-uxp-utils/ps";

await bolt.asModal("My Command", async () => {
  await bolt.deselectAllLayers();
});
```

---

## Path B - without a bundler

UXP can't resolve npm package names at runtime - only relative paths. So we ship a setup command that copies the CommonJS files into your plugin folder, and you `require()` them by relative path.

### Step 1 - install the package

```sh
npm install bolt-uxp-utils
```

### Step 2 - copy the files into your plugin

```sh
npx bolt-uxp-utils setup
```

This creates a `bolt-uxp-utils/` folder next to your `manifest.json`. It ships inside your final plugin package.

### Step 3 - require it in your code

Destructured (CommonJS):

```js
const { getActiveRoot } = require("./bolt-uxp-utils/ppro");
const { asModal, deselectAllLayers } = require("./bolt-uxp-utils/ps");
```

Namespace (CommonJS):

```js
const bolt = require("./bolt-uxp-utils/ppro");
const root = await bolt.getActiveRoot();
```

---

## Notes

Requires Adobe Premiere Pro **26.3.0+**. Earlier versions used a different transaction API; helpers like `cloneSequence`, `deleteItem`, and `setPrMetadata` won't work on older builds.

### Node version warning during install

Temporarily using the forked version of the Premiere Pro type `@adobe/premierepro` since the offical version requires Node 24.13.0+ as required, but is types-only at runtime - the constraint is overly strict. If `yarn` refuses to install, use `yarn install --ignore-engines`. `npm` warns and installs without issue.

### Build outputs (for contributors)

| Folder        | Format                  | Consumed via                            |
| ------------- | ----------------------- | --------------------------------------- |
| `dist/esm/`   | ES modules              | `import` (bundlers, modern Node)        |
| `dist/cjs/`   | CommonJS                | `require()` (vanilla UXP)               |
| `dist/types/` | TypeScript declarations | Both - for autocomplete and type checks |

The `exports` field in `package.json` picks the right one automatically.

## Develop

```sh
npm install
npm run build
```

## License

MIT
