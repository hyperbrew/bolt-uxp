import * as Comlink from "comlink";
import { api } from "./api/api";

import type { WebviewAPI } from "../webview-ui/src/webview";

interface UXPHTMLWebViewElement extends HTMLElement {
  uxpAllowInspector: string;
  src: string;
  postMessage: (msg: any) => void;
}

export const webviewInitHost = (
  webview?: UXPHTMLWebViewElement,
): Promise<WebviewAPI> => {
  console.log("webviewInitHost called", webview);
  window.webview = webview; // Store the webview globally for debugging
  return new Promise((resolve, reject) => {
    if (!webview) {
      webview = document.createElement("webview") as UXPHTMLWebViewElement;
      webview.className = "webview-ui";
      webview.uxpAllowInspector = "true";
      webview.src =
        import.meta.env.VITE_BOLT_MODE === "dev"
          ? `http://localhost:${import.meta.env.VITE_BOLT_WEBVIEW_PORT}/`
          : "plugin:/webview-ui/index.html";

      console.log("Webview Element Created:", webview, webview.src);
      webview = document
        .getElementById("app")!
        .appendChild(webview) as UXPHTMLWebViewElement;
    } else {
      console.log("Webview Element Reused:", webview, webview.src);
    }

    webview.addEventListener("loadstop", () => {
      console.log("webview loaded", webview);
      // webview.style.opacity = "1"; // Make webview visible
      const backendAPI = { api };
      const backendEndpoint = {
        postMessage: (msg: any) => {
          console.log("running postMessage", msg);
          return webview.postMessage(msg);
        },
        addEventListener: (type: string, handler: any) => {
          console.log("running addEventListener", webview.addEventListener);
          webview.addEventListener("message", handler);
        },
        removeEventListener: (type: string, handler: any) => {
          console.log(
            "running removeEventListener",
            webview.removeEventListener,
          );
          webview.removeEventListener("message", handler);
        },
      };

      // React & Svelte Works
      const endpoint = Comlink.windowEndpoint(backendEndpoint);
      // Vue Attempt
      // const endpoint = Comlink.windowEndpoint(backendEndpoint, webview);
      Comlink.expose(backendAPI, endpoint);
      //@ts-ignore
      const comlinkAPI = Comlink.wrap(endpoint) as WebviewAPI;
      resolve(comlinkAPI);

      // Send Basic Message to Webview
      // webview.postMessage({type: "uxp-to-webview"});
      // Get Basic Messages from Webview
      // window.addEventListener("message", (e) => console.log(e.data));
    });
  });
};
