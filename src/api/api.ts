import * as photoshop from "./ps";
import * as indesgin from "./id";

const hostName = require("uxp").host.name;
console.log("hostName", hostName);

let host = {} as typeof photoshop & typeof indesgin;
if (hostName === "Photoshop") {
  console.log("px FUnc");
  host = photoshop;
} else if (hostName === "InDesign") {
  console.log("ID FUnc");
  host = indesgin;
}

export const api = host;
