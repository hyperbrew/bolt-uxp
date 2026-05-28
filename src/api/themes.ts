import { os, uxp } from "../globals";
import { photoshop, premiere, indesign } from "./themes-data";

// Default Table
const colorTable = {
  dark: {
    "--uxp-host-background-color": "#535353",
    "--uxp-host-text-color": "#ffffff",
    "--uxp-host-border-color": "#454545",
    "--uxp-host-link-text-color": "#4b9cf5",
    "--uxp-host-widget-hover-background-color": "#5b5b5b",
    "--uxp-host-widget-hover-text-color": "#ffffff",
    "--uxp-host-widget-hover-border-color": "#5b5b5b",
    "--uxp-host-text-color-secondary": "#e5e5e5",
    "--uxp-host-link-hover-text-color": "#ffffff",
    "--uxp-host-label-text-color": "#ffffff",
  },
  darkest: {
    "--uxp-host-background-color": "#292929",
    "--uxp-host-text-color": "#ffffff",
    "--uxp-host-border-color": "#292929",
    "--uxp-host-link-text-color": "#4b9cf5",
    "--uxp-host-widget-hover-background-color": "#3d3d3d",
    "--uxp-host-widget-hover-text-color": "#ffffff",
    "--uxp-host-widget-hover-border-color": "#3d3d3d",
    "--uxp-host-text-color-secondary": "#9b9b9b",
    "--uxp-host-link-hover-text-color": "#ffffff",
    "--uxp-host-label-text-color": "#ffffff",
  },
  light: {
    "--uxp-host-background-color": "#b8b8b8",
    "--uxp-host-text-color": "#424242",
    "--uxp-host-border-color": "#9c9c9c",
    "--uxp-host-link-text-color": "#4b9cf5",
    "--uxp-host-widget-hover-background-color": "#9d9d9d",
    "--uxp-host-widget-hover-text-color": "#424242",
    "--uxp-host-widget-hover-border-color": "#9d9d9d",
    "--uxp-host-text-color-secondary": "#424242",
    "--uxp-host-link-hover-text-color": "#424242",
    "--uxp-host-label-text-color": "#424242",
  },
  lightest: {
    "--uxp-host-background-color": "#f0f0f0",
    "--uxp-host-text-color": "#4b4b4b",
    "--uxp-host-border-color": "#d1d1d1",
    "--uxp-host-link-text-color": "#4b9cf5",
    "--uxp-host-widget-hover-background-color": "#cecece",
    "--uxp-host-widget-hover-text-color": "#4b4b4b",
    "--uxp-host-widget-hover-border-color": "#cecece",
    "--uxp-host-text-color-secondary": "#606060",
    "--uxp-host-link-hover-text-color": "#4b4b4b",
    "--uxp-host-label-text-color": "#4b4b4b",
  },
};

export const getColorScheme = async () => {
  //@ts-ignore
  const theme = document.theme.getCurrent() as
    | "light"
    | "dark"
    | "lightest"
    | "darkest";
  let colors = colorTable[theme];
  const platform = os.platform ? os.platform() : "";
  const hostName =
    uxp.host.name.toLowerCase().replace(/\s/g, "") || ("" as string);

  // Overrides
  if (hostName.startsWith("premierepro")) {
    console.log("Color Override Premiere", { platform, theme });
    if (platform === "darwin") colors = premiere.mac[theme];
    else if (platform.includes("win")) colors = premiere.win[theme];
  } else if (hostName.startsWith("indesign")) {
    console.log("Color Override InDesign", { platform, theme });
    if (platform === "darwin") colors = indesign.mac[theme];
    else if (platform.includes("win")) colors = indesign.win[theme];
  } else if (hostName.startsWith("photoshop")) {
    console.log("Color Override Photoshop", { platform, theme });
    if (platform === "darwin") colors = photoshop.mac[theme];
    else if (platform.includes("win")) colors = photoshop.win[theme];
  } else {
    console.warn("unknown host");
  }
  console.log("Final Colors", colors);
  return { theme, colors };
};
