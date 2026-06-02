import * as Comlink from "comlink";
import { api } from "./api/api";

import type { WebviewAPI } from "../webview-ui/src/webview";
import { config } from "../uxp.config";
import { getColorScheme } from "./api/uxp";
import { uxp } from "./globals";

interface UXPHTMLWebViewElement extends HTMLElement {
  uxpAllowInspector: string;
  src: string;
  postMessage: (msg: any) => void;
}

export const webviewInitHost = (params: {
  // webview?: UXPHTMLWebViewElement;
  multi: boolean | string[];
}): Promise<WebviewAPI[]> => {
  const multi = params ? params.multi : false;
  const id = uxp.entrypoints._pluginInfo.id;
  return new Promise((resolve, reject) => {
    let pages = ["main"];
    if (multi === true || Array.isArray(multi)) {
      pages = config.manifest.entrypoints.map(
        (point) => point.id.split(".")!.pop()!,
      );
      console.log("webviewInitHost multi pages", pages);
    }
    console.log("setup webview for", pages);
    let apis: WebviewAPI[] = [];
    pages.map((page, i) => {
      // if (i > 0) return;
      let webview = document.createElement("webview") as UXPHTMLWebViewElement;
      webview.className = "webview-ui";
      webview.id = `webview-${i}`;
      webview.uxpAllowInspector = "true";
      const origin =
        import.meta.env.VITE_BOLT_MODE === "dev"
          ? `http://localhost:${import.meta.env.VITE_BOLT_WEBVIEW_PORT}/?page=${page}`
          : `plugin:/webview-ui/${page}.html`;
      webview.src = origin;

      const appElement = document.getElementById("app")!;
      let parent: HTMLElement | null = null;
      if (i === 0) {
        parent = appElement;
      } else {
        const panelElements = Array.from(
          document.getElementsByTagName("uxp-panel"),
        );
        const found = panelElements.find((item) => {
          return item.getAttribute("panelid") === `${id}.${page}`;
        });
        if (found) parent = found as HTMLElement;
      }
      if (parent === null) {
        return console.error("cannot find parent");
      }
      console.log({ parent });
      webview = parent!.appendChild(webview) as UXPHTMLWebViewElement;

      webview.addEventListener("message", (e) => {
        console.log("webview message", page, e.message);
      });

      const setupListeners = () => {
        const backendAPI = { api };
        const backendEndpoint = {
          postMessage: (msg: any, transferrables: any) => {
            console.log("running postMessage", page, msg), transferrables;
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

        const endpoint = Comlink.windowEndpoint(backendEndpoint);

        // Now we bind to the Webview's APIs
        //@ts-ignore
        const comlinkAPI = Comlink.wrap(endpoint) as WebviewAPI;
        // TODO: might need to adjust for multi webviews
        apis.push(comlinkAPI);
        // Once - At End
        Comlink.expose(
          backendAPI,
          endpoint,
          [origin], // doesn't work in prod
        );
        if (apis.length === pages.length) {
          console.log("webviewInitHost resolved");
          for (const api of apis) {
            getColorScheme().then((scheme) => {
              api.updateColorScheme(scheme);
            });
            //@ts-ignore
            document.theme.onUpdated.addListener(() =>
              getColorScheme().then((scheme) => {
                api.updateColorScheme(scheme);
              }),
            );
          }
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
        window.addEventListener("message", (e) => console.log("MESSAGE:", e));
      };

      // Invoke Immediately

      setupListeners();

      // Invoke on loadStop event (seems to cause a race condition in dev mode)

      // let loaded = false;
      // webview.addEventListener("loadstop", (e) => {
      // if (loaded) return;
      // loaded = true;
      // setupListeners()
      // });
    });
  });
};
