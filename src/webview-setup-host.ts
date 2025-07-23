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
  page = "main",
): Promise<WebviewAPI> => {
  return new Promise((resolve, reject) => {
    if (!webview) {
      webview = document.createElement("webview") as UXPHTMLWebViewElement;
      webview.className = "webview-ui";
      webview.uxpAllowInspector = "true";
      webview.src =
        import.meta.env.VITE_BOLT_MODE === "dev"
          ? `http://localhost:${import.meta.env.VITE_BOLT_WEBVIEW_PORT}?page=${page}`
          : `plugin:/webview-ui/index.html?page=${page}`;

      webview = document
        .getElementById("app")!
        .appendChild(webview) as UXPHTMLWebViewElement;
    } else {
      // webview element reused
    }

    webview.addEventListener("loadstop", () => {
      const backendAPI = { api };
      const backendEndpoint = {
        postMessage: (msg: any) => {
          console.log("running postMessage", msg);
          return webview!.postMessage(msg);
        },
        addEventListener: (type: string, handler: any) => {
          console.log("running addEventListener", webview!.addEventListener);
          webview!.addEventListener("message", handler);
        },
        removeEventListener: (type: string, handler: any) => {
          console.log(
            "running removeEventListener",
            webview!.removeEventListener,
          );
          webview!.removeEventListener("message", handler);
        },
      };

      const endpoint = Comlink.windowEndpoint(backendEndpoint);
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
