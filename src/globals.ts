// import type { premierepro as premiereproTypes } from "./types/ppro";
import type { premierepro as premiereproTypes } from "@adobe/premierepro";

if (typeof require === "undefined") {
  //@ts-ignore
  window.require = (moduleName: string) => {
    return {};
  };
}

export const uxp = require("uxp") as typeof import("uxp");
export const os = require("os") as typeof import("os");
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

// Beta APIs

export const illustrator = (
  hostName === "illustrator" ? require("illustrator") : {}
) as any;

export const aftereffects = (
  hostName === "aftereffects" ? require("aftereffects") : {}
) as any;

export const mediaencoder = (
  hostName === "mediaencoder" ? require("mediaencoder") : {}
) as any;
