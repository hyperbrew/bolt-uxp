import React, { useState } from "react";

import boltUxpLogo from "./assets/bolt-uxp.png";
import viteLogo from "./assets/vite.png";
import tsLogo from "./assets/typescript.png";
import sassLogo from "./assets/sass.png";
import reactLogo from "./assets/react.png";

import { uxp, indesign, photoshop } from "./globals";
const { openExternal } = uxp.shell;
import { api } from "./api/api";

export const App = () => {
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);

  console.log("Welcome to Bolt UXP inside of: ", uxp.host.name);

  //* Call Functions Conditionally by App
  if (uxp.host.name === "Photoshop") {
    console.log("Hello from Photoshop", photoshop);
  }
  if (uxp.host.name === "InDesign") {
    console.log("Hello from InDesign", indesign);
  }

  //* Or call the unified API object directly and the correct app function will be used
  const helloWorld = () => {
    api.notify("Hello World");
  };

  const hybridTest = async () => {
    try {
      const addon = await require("sample-uxp-addon.uxpaddon");
      const myFunctionResult = addon.my_function();
      console.log(`myFunctionResult = `, myFunctionResult);
      api.notify(`myFunctionResult = ${myFunctionResult}`);
    } catch (err) {
      console.log("Execute as testMyFunction command failed", err);
    }
  };
  return (
    <main>
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
        <button onClick={helloWorld}>Hello World</button>
        <button onClick={hybridTest}>Hybrid</button>
      </div>
      <div>
        <p>
          Edit <span className="code">main.svelte</span> and save to test HMR
          updates.
        </p>
      </div>
      <div className="button-group">
        <a href="https://github.com/hyperbrew/bolt-uxp/">Bolt UXP Docs</a>
        <a href="https://svelte.dev">Svelte Docs</a>
        <a href="https://vitejs.dev/">Vite Docs</a>
      </div>
    </main>
  );
};
