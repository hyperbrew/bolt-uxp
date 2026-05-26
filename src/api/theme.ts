import { os, uxp } from "../globals";

export type UXPTheme = "light" | "dark" | "lightest" | "darkest";
export type UXPHost = "photoshop" | "premierepro" | "indesign";
export type UXPPlatform = "mac" | "win";

export type ColorMap = Record<string, string>;
type ThemeTable = Record<UXPTheme, ColorMap>;
type HostTable = Partial<Record<UXPPlatform, Partial<ThemeTable>>>;

/**
 * Default fallback color table - used when no host/platform override is defined
 * Mirrors the Photoshop UXP themes, gathered from Photoshop's host-theme.css
 */
const defaultColors: ThemeTable = {
  lightest: {
    //essentials
    "--uxp-host-background-color": "#f0f0f0",
    "--uxp-host-text-color": "#4b4b4b",
    "--uxp-host-border-color": "#d1d1d1",
    "--uxp-host-link-text-color": "#4b9cf5",
    "--uxp-host-widget-hover-background-color": "#cecece",
    "--uxp-host-widget-hover-text-color": "#4b4b4b",
    "--uxp-host-widget-hover-border-color": "#cecece",

    //extras
    "--uxp-host-text-color-secondary": "#606060",
    "--uxp-host-link-hover-text-color": "#4b4b4b",
    "--uxp-host-label-text-color": "#4b4b4b",
    "--uxp-host-popover-background-color": "#f0f0f0",
    "--uxp-host-popover-border-color": "#d3d3d3",
    "--uxp-host-heading-text-color": "#585858",
    "--uxp-host-dropdown-background-color": "#f0f0f0",
    "--uxp-host-dropdown-border-color": "#d3d3d3",
    "--uxp-host-dropdown-text-color": "#4b4b4b",
    "--uxp-host-dropdown-hover-background-color": "#e9e9e9",
    "--uxp-host-toggle-text-color": "#2a2a2a",
    "--uxp-host-toggle-background-color": "#fcfcfc",
    "--uxp-host-toggle-border-color": "#cccccc",
    "--uxp-host-toggle-selected-text-color": "#505050",
    "--uxp-host-toggle-selected-background-color": "#bfbfbf",
    "--uxp-host-text-button-text-color": "#505050",
  },
  light: {
    //essentials
    "--uxp-host-background-color": "#b8b8b8",
    "--uxp-host-text-color": "#424242",
    "--uxp-host-border-color": "#9c9c9c",
    "--uxp-host-link-text-color": "#4b9cf5",
    "--uxp-host-widget-hover-background-color": "#9d9d9d",
    "--uxp-host-widget-hover-text-color": "#424242",
    "--uxp-host-widget-hover-border-color": "#9d9d9d",

    //extras
    "--uxp-host-text-color-secondary": "#424242",
    "--uxp-host-link-hover-text-color": "#424242",
    "--uxp-host-label-text-color": "#424242",
    "--uxp-host-popover-background-color": "#b8b8b8",
    "--uxp-host-popover-border-color": "#cacaca",
    "--uxp-host-heading-text-color": "#3f3f3f",
    "--uxp-host-dropdown-background-color": "#b8b8b8",
    "--uxp-host-dropdown-border-color": "#cacaca",
    "--uxp-host-dropdown-text-color": "#4b4b4b",
    "--uxp-host-dropdown-hover-background-color": "#b3b3b3",
    "--uxp-host-toggle-text-color": "#0f0f0f",
    "--uxp-host-toggle-background-color": "#d1d1d1",
    "--uxp-host-toggle-border-color": "#949494",
    "--uxp-host-toggle-selected-text-color": "#4b4b4b",
    "--uxp-host-toggle-selected-background-color": "#a5a5a5",
    "--uxp-host-text-button-text-color": "#4b4b4b",
  },
  dark: {
    //essentials
    "--uxp-host-background-color": "#535353",
    "--uxp-host-text-color": "#ffffff",
    "--uxp-host-border-color": "#454545",
    "--uxp-host-link-text-color": "#4b9cf5",
    "--uxp-host-widget-hover-background-color": "#5b5b5b",
    "--uxp-host-widget-hover-text-color": "#ffffff",
    "--uxp-host-widget-hover-border-color": "#5b5b5b",

    //extras
    "--uxp-host-text-color-secondary": "#e5e5e5",
    "--uxp-host-link-hover-text-color": "#ffffff",
    "--uxp-host-label-text-color": "#ffffff",
    "--uxp-host-popover-background-color": "#535353",
    "--uxp-host-popover-border-color": "#5a5a5a",
    "--uxp-host-heading-text-color": "#f3f3f3",
    "--uxp-host-dropdown-background-color": "#535353",
    "--uxp-host-dropdown-border-color": "#5a5a5a",
    "--uxp-host-dropdown-text-color": "#ffffff",
    "--uxp-host-dropdown-hover-background-color": "#5d5d5d",
    "--uxp-host-toggle-text-color": "#f0f0f0",
    "--uxp-host-toggle-background-color": "#444444",
    "--uxp-host-toggle-border-color": "#666666",
    "--uxp-host-toggle-selected-text-color": "#e3e3e3",
    "--uxp-host-toggle-selected-background-color": "#6b6b6b",
    "--uxp-host-text-button-text-color": "#e3e3e3",
  },
  darkest: {
    //essentials
    "--uxp-host-background-color": "#323232",
    "--uxp-host-text-color": "#ffffff",
    "--uxp-host-border-color": "#292929",
    "--uxp-host-link-text-color": "#4b9cf5",
    "--uxp-host-widget-hover-background-color": "#3d3d3d",
    "--uxp-host-widget-hover-text-color": "#ffffff",
    "--uxp-host-widget-hover-border-color": "#3d3d3d",

    //extras
    "--uxp-host-text-color-secondary": "#9b9b9b",
    "--uxp-host-link-hover-text-color": "#ffffff",
    "--uxp-host-label-text-color": "#ffffff",
    "--uxp-host-popover-background-color": "#323232",
    "--uxp-host-popover-border-color": "#494949",
    "--uxp-host-heading-text-color": "#e7e7e7",
    "--uxp-host-dropdown-background-color": "#323232",
    "--uxp-host-dropdown-border-color": "#494949",
    "--uxp-host-dropdown-text-color": "#ffffff",
    "--uxp-host-dropdown-hover-background-color": "#434343",
    "--uxp-host-toggle-text-color": "#e1e1e1",
    "--uxp-host-toggle-background-color": "#2a2a2a",
    "--uxp-host-toggle-border-color": "#474747",
    "--uxp-host-toggle-selected-text-color": "#c8c8c8",
    "--uxp-host-toggle-selected-background-color": "#474747",
    "--uxp-host-text-button-text-color": "#c8c8c8",
  },
};

// Per host + platform overrides. Any theme/key omitted falls back to defaultColors.
const hostOverrides: Partial<Record<UXPHost, HostTable>> = {
  premierepro: {
    mac: {
      dark: {
        "--uxp-host-background-color": "#323232",
      },
      darkest: {
        "--uxp-host-background-color": "#1d1d1d",
      },
      light: {
        "--uxp-host-background-color": "#f8f8f8",
      },
    },
    win: {
      dark: {
        "--uxp-host-background-color": "#323232",
      },
      darkest: {
        "--uxp-host-background-color": "#1d1d1d",
      },
      light: {
        "--uxp-host-background-color": "#f8f8f8",
      },
    },
  },
  // photoshop: { ... }  // TODO: fill once colors are gathered
  // indesign:  { ... }  // TODO: fill once colors are gathered
};

const detectHost = (): UXPHost | null => {
  const name = (uxp.host.name || "").toLowerCase().replace(/\s/g, "");
  if (name.startsWith("premierepro")) return "premierepro";
  if (name.startsWith("photoshop")) return "photoshop";
  if (name.startsWith("indesign")) return "indesign";
  return null;
};

const detectPlatform = (): UXPPlatform | null => {
  const p = os.platform ? os.platform() : "";
  if (p === "darwin") return "mac";
  if (p.includes("win")) return "win";
  return null;
};

const resolveColors = (
  host: UXPHost | null,
  platform: UXPPlatform | null,
  theme: UXPTheme,
): ColorMap => {
  const base = defaultColors[theme];
  if (!host || !platform) return base;
  const override = hostOverrides[host]?.[platform]?.[theme];
  return override ? { ...base, ...override } : base;
};

export const getColorScheme = async () => {
  //@ts-ignore
  const theme = document.theme.getCurrent() as UXPTheme;
  const host = detectHost();
  const platform = detectPlatform();
  const colors = resolveColors(host, platform, theme);
  return { theme, colors };
};
