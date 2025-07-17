import * as Comlink from "comlink";

import type { API } from "../../src/api/api";

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

export const initWebview = (webviewAPI: object): API => {
  const endpoint = Comlink.windowEndpoint(hostEndpoint);
  const comlinkAPI = Comlink.wrap(endpoint);
  Comlink.expose(webviewAPI, endpoint);
  //@ts-ignore
  const api = comlinkAPI.api as API;
  return api;
};

// basic way to send a message
// const sendMessage = () => window.uxpHost.postMessage({ type: "message", text: "msg" },"*");

// basic way to get a message
// window.addEventListener("message", (e) => console.log(e));
