import * as Comlink from "comlink";

import type { API } from "../../src/api/api";
import { updateColorScheme } from "./webview-api";

interface UXPWebviewWindow extends Window {
  uxpHost: {
    postMessage: (msg: any) => void;
    addEventListener: (type: string, handler: Function) => void;
    removeEventListener: (type: string, handler: Function) => void;
  };
}
declare var window: UXPWebviewWindow;

const hostEndpoint = {
  postMessage: (msg: any) => window.uxpHost.postMessage(msg),
  addEventListener: (type: string, handler: Function) => {
    window.uxpHost.addEventListener("message", handler);
  },
  removeEventListener: (type: string, handler: Function) => {
    window.uxpHost.removeEventListener("message", handler);
  },
};

export const initWebview = (webviewAPI: object): { page: string; api: API } => {
  const page =
    new URL(location.href).searchParams.get("page") ||
    location.href.split("/").pop()!.replace(".html", "");
  console.log("initWebview called", webviewAPI);
  const endpoint = Comlink.windowEndpoint(hostEndpoint);
  // const endpoint = Comlink.windowEndpoint(hostEndpoint, window);
  const comlinkAPI = Comlink.wrap(endpoint);
  Comlink.expose(webviewAPI, endpoint);
  //@ts-ignore
  const api = comlinkAPI.api as API;
  // update color scheme on load
  api.getColorScheme().then((scheme) => {
    updateColorScheme(scheme);
  });
  return { api, page };
};

// basic way to send a message
// const sendMessage = () => window.uxpHost.postMessage({ type: "message", text: "msg" },"*");

// basic way to get a message
// window.addEventListener("message", (e) => console.log(e));
