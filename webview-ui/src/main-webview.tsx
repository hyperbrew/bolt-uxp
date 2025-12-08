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
  const { api, page } = initWebview(webviewAPI);
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

  const clickLink = async (event: any) => {
    event.preventDefault();
    const url = (event.target as HTMLAnchorElement).href;
    await api.openURL(url);
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
      <div className="stack-colors">
        <div className="stack-colors-a"></div>
        <div className="stack-colors-b"></div>
        <div className="stack-colors-c"></div>
        <div className="stack-colors-d"></div>
        <div className="stack-colors-e"></div>
        <div className="stack-colors-f"></div>
        <div className="stack-colors-g"></div>
        <div className="stack-colors-h"></div>
        <div className="stack-colors-i"></div>
        <div className="stack-colors-j"></div>
      </div>
      <div>
        <p>
          Edit <span className="code">webview-ui/src/main-webview.tsx</span> and
          save to test HMR updates.
        </p>
        <p>Webview page: {page}</p>
      </div>
      <div className="button-group">
        <a href="https://github.com/hyperbrew/bolt-uxp/" onClick={clickLink}>
          Bolt UXP Docs
        </a>
        <a href="https://svelte.dev" onClick={clickLink}>
          Svelte Docs
        </a>
        <a href="https://vitejs.dev/" onClick={clickLink}>
          Vite Docs
        </a>
      </div>
      {/* BOLT_SAMPLECODE_END */}
    </main>
  );
};
