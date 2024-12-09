declare module "*.png";
declare module "*.gif";
declare module "*.jpg";
declare module "*.svg";

import type { premierepro as premiereproTypes } from "./types/ppro";

export const uxp = require("uxp") as typeof import("uxp");
const hostName = uxp.host.name.toLowerCase();

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
