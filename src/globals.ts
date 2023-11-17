declare module "*.png";
declare module "*.gif";
declare module "*.jpg";
declare module "*.svg";

export const uxp = require("uxp") as typeof import("uxp");
const hostName = uxp.host.name;

export const photoshop = (
  hostName === "Photoshop" ? require("photoshop") : {}
) as typeof import("photoshop");

export const indesign = (
  hostName === "InDesign" ? require("indesign") : {}
) as any;
export const premierepro = (
  hostName === "PremierePro" ? require("premierepro") : {}
) as any;
export const illustrator = (
  hostName === "Illustrator" ? require("illustrator") : {}
) as any;
