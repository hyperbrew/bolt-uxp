import * as Comlink from "comlink";
import { api } from "./api/api";

interface UXPHTMLWebViewElement extends HTMLElement {
  uxpAllowInspector: string;
  src: string;
  postMessage: (msg: any) => void;
}

export const webviewInitHost = () => {
  let webview = document.createElement("webview") as UXPHTMLWebViewElement;

  // TODO: Make HMR Port Dynamic
  webview.src =
    import.meta.env.VITE_BOLT_MODE === "dev"
      ? "http://localhost:8081/"
      : "plugin:/webview-ui/index.html";
  webview.className = "webview-ui";
  webview.uxpAllowInspector = "true";

  console.log("Webview Element Created:", webview);

  webview = document
    .getElementById("app")!
    .appendChild(webview) as UXPHTMLWebViewElement;

  webview.addEventListener("loadstop", () => {
    // webview.style.opacity = "1"; // Make webview visible
    const backendAPI = { api };
    const backendEndpoint = {
      postMessage: (msg: any) => webview.postMessage(msg),
      addEventListener: (type: string, handler: any) => {
        webview.addEventListener("message", handler);
      },
      removeEventListener: (type: string, handler: any) => {
        webview.removeEventListener("message", handler);
      },
    };

    const endpoint = Comlink.windowEndpoint(backendEndpoint);
    Comlink.expose(backendAPI, endpoint);

    // Send Basic Message to Webview
    // webview.postMessage({type: "uxp-to-webview"});
    // Get Basic Messages from Webview
    // window.addEventListener("message", (e) => console.log(e.data));
  });
};
