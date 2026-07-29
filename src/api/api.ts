import * as photoshop from "./photoshop"; // BOLT_PHXS_ONLY
import * as indesign from "./indesign"; // BOLT_IDSN_ONLY
import * as premierepro from "./premierepro"; // BOLT_PPRO_ONLY
import * as mediaencoder from "./mediaencoder"; // BOLT_AME_ONLY
import * as aftereffects from "./aftereffects"; // BOLT_AEFT_ONLY
import * as illustrator from "./illustrator"; // BOLT_ILST_ONLY
import { uxp } from "../globals";
import * as uxpLib from "./uxp";

const hostName =
  uxp?.host?.name.toLowerCase().replace(/\s/g, "") || ("" as string);

// prettier-ignore
let host = {} as 
  & typeof uxpLib // BOLT_PHXS_ONLY
  & typeof photoshop // BOLT_PHXS_ONLY
  & typeof indesign // BOLT_IDSN_ONLY
  & typeof premierepro // BOLT_PPRO_ONLY
  & typeof mediaencoder // BOLT_AME_ONLY
  & typeof aftereffects // BOLT_AEFT_ONLY
  & typeof illustrator; // BOLT_ILST_ONLY

export type API = typeof host & typeof uxpLib;

if (hostName.startsWith("photoshop")) host = photoshop; // BOLT_PHXS_ONLY
if (hostName.startsWith("indesign")) host = indesign; // BOLT_IDSN_ONLY
if (hostName.startsWith("premierepro")) host = premierepro; // BOLT_PPRO_ONLY
if (hostName.startsWith("illustrator")) host = illustrator; // BOLT_ILST_ONLY
if (hostName.startsWith("illustrator")) host = mediaencoder; // BOLT_AME_ONLY
if (hostName.startsWith("illustrator")) host = aftereffects; // BOLT_AEFT_ONLY

export const api = { ...uxpLib, ...host };
