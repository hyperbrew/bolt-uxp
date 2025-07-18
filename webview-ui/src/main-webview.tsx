import React, { useState } from "react";

// BOLT_SAMPLECODE_START
import boltUxpLogo from "../../src/assets/bolt-uxp.png";
import viteLogo from "../../src/assets/vite.png";
import tsLogo from "../../src/assets/typescript.png";
import sassLogo from "../../src/assets/sass.png";
import reactLogo from "../../src/assets/react.png";

// BOLT_SAMPLECODE_END

import * as webviewAPI from "./webview-api";

import { initWebview } from "./webview-setup";

export const App = () => {
  const api = initWebview(webviewAPI);
  // BOLT_SAMPLECODE_START
  const [count, setCount] = useState(0);
  const increment = () => setCount((prev) => prev + 1);
  // BOLT_SAMPLECODE_END

  const simpleAlert = async () => await api.notify("Hello World");

  const getProjectInfo = async () => {
    const info = await api.getProjectInfo();
    const projectInfo = JSON.stringify(info, null, 2);
    console.log("Project Info:", { info });
    await api.notify(projectInfo);
  };

  const getUXPInfo = async () => {
    const info = await api.getUXPInfo();
    const uxpInfo = JSON.stringify(info, null, 2);
    console.log("Project Info:", { info });
    await api.notify(uxpInfo);
  };

  return (
    <main>
      {/* BOLT_SAMPLECODE_START */}
      <div>
        <img className="logo-lg" src={boltUxpLogo} alt="" />
      </div>
      <div className="stack-icons">
        <img src={viteLogo} className="logo" alt="" />
        <span> + </span>
        <img src={reactLogo} className="logo" alt="" />
        <span> + </span>
        <img src={tsLogo} className="logo" alt="" />
        <span> + </span>
        <img src={sassLogo} className="logo" alt="" />
      </div>
      <div className="button-group">
        <button onClick={increment}>count is {count}</button>
        <button onClick={simpleAlert}>Alert</button>
        <button onClick={getProjectInfo}>Get Project Info</button>
        <button onClick={getUXPInfo}>Get UXP Info</button>
      </div>
      <div>
        <p>
          Edit <span className="code">webview-ui/src/main-webview.tsx</span> and
          save to test HMR updates.
        </p>
      </div>
      <div className="button-group">
        <a href="https://github.com/hyperbrew/bolt-uxp/">Bolt UXP Docs</a>
        <a href="https://svelte.dev">Svelte Docs</a>
        <a href="https://vitejs.dev/">Vite Docs</a>
      </div>
      {/* BOLT_SAMPLECODE_END */}
    </main>
  );
};
