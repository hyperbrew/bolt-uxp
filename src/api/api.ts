import * as photoshop from "./photoshop";
import * as indesgin from "./indesign";

const hostName = require("uxp").host.name;
console.log("hostName", hostName);

let host = {} as typeof photoshop & typeof indesgin;
if (hostName === "Photoshop") {
  host = photoshop;
} else if (hostName === "InDesign") {
  host = indesgin;
}

export const api = host;
