import * as photoshop from "./photoshop"; // BOLT_PHXS_ONLY
import * as indesgin from "./indesign"; // BOLT_IDSN_ONLY
import * as premierepro from "./premierepro"; // BOLT_PPRO_ONLY
import * as illustrator from "./illustrator"; // BOLT_ILST_ONLY

const hostName = require("uxp")
  .host.name.toLowerCase()
  .replace(/\s/g, "") as string;

// prettier-ignore
let host = {} as 
  & typeof photoshop // BOLT_PHXS_ONLY
  & typeof indesgin // BOLT_IDSN_ONLY
  & typeof premierepro // BOLT_PPRO_ONLY
  & typeof illustrator; // BOLT_ILST_ONLY

if (hostName.startsWith("photoshop")) host = photoshop; // BOLT_PHXS_ONLY
if (hostName.startsWith("indesign")) host = indesgin; // BOLT_IDSN_ONLY
if (hostName.startsWith("premierepro")) host = premierepro; // BOLT_PPRO_ONLY
if (hostName.startsWith("illustrator")) host = illustrator; // BOLT_ILST_ONLY

export const api = host;
