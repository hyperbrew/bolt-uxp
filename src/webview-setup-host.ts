import * as Comlink from "comlink";
import { api } from "./api/api";

import type { WebviewAPI } from "../webview-ui/src/webview";
import { id, config } from "../uxp.config";

interface UXPHTMLWebViewElement extends HTMLElement {
  uxpAllowInspector: string;
  src: string;
  postMessage: (msg: any) => void;
}

export const webviewInitHost = ({
  // webview,
  multi,
}: {
  // webview?: UXPHTMLWebViewElement;
  multi: boolean | string[];
}): Promise<WebviewAPI[]> => {
  return new Promise((resolve, reject) => {
    let pages = ["main"];
    if (multi === true || Array.isArray(multi)) {
      pages = config.manifest.entrypoints.map(
        (point) => point.id.split(".")!.pop()!,
      );
      console.log("webviewInitHost multi pages", pages);
    }
    let apis: WebviewAPI[] = [];
    pages.map((page, i) => {
      // if (i > 0) return;
      let webview = document.createElement("webview") as UXPHTMLWebViewElement;
      webview.className = "webview-ui";
      webview.uxpAllowInspector = "true";
      const origin =
        import.meta.env.VITE_BOLT_MODE === "dev"
          ? `http://localhost:${import.meta.env.VITE_BOLT_WEBVIEW_PORT}/?page=${page}`
          : `plugin:/webview-ui/index.html?page=${page}`;
      webview.src = origin;

      const appElement = document.getElementById("app")!;
      const parent =
        i === 0
          ? appElement
          : Array.from(document.getElementsByTagName("uxp-panel")).find(
              (item) => item.getAttribute("panelid") === `${id}.${page}`,
            );
      console.log({ parent });
      webview = parent!.appendChild(webview) as UXPHTMLWebViewElement;

      webview.addEventListener("loadstop", () => {
        const backendAPI = { api };
        const backendEndpoint = {
          postMessage: (msg: any) => {
            console.log("running postMessage", page, msg);
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

        console.log({ origin });

        const endpoint = Comlink.windowEndpoint(
          backendEndpoint,
          undefined,
          // origin, // doesn't work in prod
        );

        Comlink.expose(
          backendAPI,
          endpoint,
          // [origin] // doesn't work in prod
        );
        //@ts-ignore
        const comlinkAPI = Comlink.wrap(endpoint) as WebviewAPI;
        // TODO: might need to adjust for multi webviews
        apis.push(comlinkAPI);
        if (apis.length === pages.length) {
          console.log("webviewInitHost resolved");
          resolve(apis);
        }
        // else {
        //   console.log(
        //     "webviewInitHost not resolved yet",
        //     apis.length,
        //     pages.length,
        //   );
        // }

        // Send Basic Message to Webview
        // webview.postMessage({type: "uxp-to-webview"});

        // Get Basic Messages from Webview
        // let lastEventId = ''
        // window.addEventListener("message", (e) => console.log(e));
      });
    });
  });
};
