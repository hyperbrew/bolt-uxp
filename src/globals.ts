import type { premierepro as premiereproTypes } from "./types/ppro";

if (typeof require === "undefined") {
  //@ts-ignore
  window.require = (moduleName: string) => {
    return {};
  };
}

export const uxp = require("uxp") as typeof import("uxp");
const hostName = uxp && uxp?.host?.name?.toLowerCase();

export const photoshop = (
  hostName === "photoshop" ? require("photoshop") : {}
) as typeof import("photoshop");

export const indesign = (
  hostName === "indesign" ? require("indesign") : {}
) as any;
export const premierepro = (
  hostName === "premierepro" ? require("premierepro") : {}
) as premiereproTypes;
export const illustrator = (
  hostName === "illustrator" ? require("illustrator") : {}
) as any;
