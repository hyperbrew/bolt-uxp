export const uxp = require("uxp") as typeof import("uxp");
const hostName = uxp.host.name;

export const photoshop = (
  hostName === "Photoshop" ? require("photoshop") : {}
) as typeof import("photoshop");

export const indesign = (
  hostName === "InDesign" ? require("indesign") : {}
) as any;
