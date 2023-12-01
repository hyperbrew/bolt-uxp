import * as photoshop from "./photoshop"; // BOLT-UXP_PHOTOSHOP_ONLY
import * as indesgin from "./indesign"; // BOLT-UXP_INDESIGN_ONLY
import * as premierepro from "./premierepro"; // BOLT-UXP_PREMIEREPRO_ONLY
import * as illustrator from "./illustrator"; // BOLT-UXP_ILLUSTRATOR_ONLY

const hostName = require("uxp").host.name.toLowerCase() as string;

// prettier-ignore
let host = {} as 
  & typeof photoshop // BOLT-UXP_PHOTOSHOP_ONLY
  & typeof indesgin // BOLT-UXP_INDESIGN_ONLY
  & typeof premierepro // BOLT-UXP_PREMIEREPRO_ONLY
  & typeof illustrator; // BOLT-UXP_ILLUSTRATOR_ONLY

if (hostName === "photoshop") host = photoshop; // BOLT-UXP_PHOTOSHOP_ONLY
if (hostName === "indesign") host = indesgin; // BOLT-UXP_INDESIGN_ONLY
if (hostName === "premierepro") host = premierepro; // BOLT-UXP_PREMIEREPRO_ONLY
if (hostName === "illustrator") host = illustrator; // BOLT-UXP_ILLUSTRATOR_ONLY

export const api = host;
