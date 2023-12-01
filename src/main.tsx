import React, { useState } from "react";

import boltUxpLogo from "./assets/bolt-uxp.png";
import viteLogo from "./assets/vite.png";
import tsLogo from "./assets/typescript.png";
import sassLogo from "./assets/sass.png";
import reactLogo from "./assets/react.png";

import { uxp, indesign, photoshop } from "./globals";
import { api } from "./api/api";

export const App = () => {
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);

  const hostName = (uxp.host.name as string).toLowerCase();

  //* Call Functions Conditionally by App
  // BOLT-UXP_PHOTOSHOP_START
  if (hostName === "photoshop") {
    console.log("Hello from Photoshop", photoshop);
  }
  // BOLT-UXP_PHOTOSHOP_END
  // BOLT-UXP_INDESIGN_START
  if (hostName === "indesign") {
    console.log("Hello from InDesign", indesign);
  }
  // BOLT-UXP_INDESIGN_END
  // BOLT-UXP_PREMIEREPRO_START
  if (hostName === "premierepro") {
    console.log("Hello from Premiere Pro", indesign);
  }
  // BOLT-UXP_PREMIEREPRO_END
  // BOLT-UXP_ILLUSTRATOR_START
  if (hostName === "illustrator") {
    console.log("Hello from Illustrator", indesign);
  }
  // BOLT-UXP_ILLUSTRATOR_END

  //* Or call the unified API object directly and the correct app function will be used
  const helloWorld = () => {
    api.notify("Hello World");
  };

  const hybridTest = async () => {
    try {
      const addon = await require("bolt-uxp-hybrid.uxpaddon");
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
