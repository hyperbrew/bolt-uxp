import type { HostThemeModule } from "./theme";

/**
 * Hardcoded Premiere Pro palettes (mac + win, light/dark/darkest)
 * win differs from mac only by accent colors (red/blue)
 */
const palettes = {
  mac: {
    light: {
      // surfaces
      background: "#F8F8F8",
      backgroundDeep: "#FDFDFD",
      widgetBackground: "#FDFDFD",
      border: "#E6E6E6",
      borderLight: "#D5D5D5",
      inputHoverBg: "#FFFFFF",

      // text
      primary: "#464646",
      secondary: "#6D6D6D",
      arrowsInputNumberColor: "dark", //arrows color on input

      // accent (widgets focus / links)
      accent: "#147AF3",
      accentHover: "#0265DC",
      accentDown: "#0054B6",

      // button - shared disabled
      buttonDisabled: "#B1B1B1",
      buttonDisabledText: "#E6E6E6",

      // button - accent (blue)
      buttonAccent: "#0265DC",
      buttonAccentText: "#FFFFFF",
      buttonAccentHover: "#0054B6",
      buttonAccentHoverText: "#FFFFFF",
      buttonAccentDown: "#004491",
      buttonAccentDownText: "#FFFFFF",

      // button - primary
      buttonPrimary: "#6D6D6D",
      buttonPrimaryText: "#E6E6E6",
      buttonPrimaryHover: "#464646",
      buttonPrimaryHoverText: "#FDFDFD",
      buttonPrimaryDown: "#222222",
      buttonPrimaryDownText: "#FFFFFF",

      // button - secondary
      buttonSecondary: "#E6E6E6",
      buttonSecondaryText: "#6D6D6D",
      buttonSecondaryHover: "#D5D5D5",
      buttonSecondaryHoverText: "#464646",
      buttonSecondaryDown: "#B1B1B1",
      buttonSecondaryDownText: "#222222",

      // button - negative (red)
      buttonNegative: "#D3150F",
      buttonNegativeText: "#FFFFFF",
      buttonNegativeHover: "#B40000",
      buttonNegativeHoverText: "#FFFFFF",
      buttonNegativeDown: "#930000",
      buttonNegativeDownText: "#FFFFFF",
    },
    dark: {
      // surfaces
      background: "#323232",
      backgroundDeep: "#1D1D1D",
      widgetBackground: "#262626",
      border: "#3F3F3F",
      borderLight: "#545454",
      inputHoverBg: "#1D1D1D",

      // text
      primary: "#D1D1D1",
      secondary: "#B2B2B2",
      arrowsInputNumberColor: "light", //arrows color on input

      // accent (widgets focus / links)
      accent: "#54A3F6",
      accentHover: "#72B7F9",
      accentDown: "#8FCAFC",

      // button - shared disabled (same for all variants)
      buttonDisabled: "#3F3F3F",
      buttonDisabledText: "#707070",

      // button - accent (blue)
      buttonAccent: "#0367E0",
      buttonAccentText: "#FFFFFF",
      buttonAccentHover: "#0059C2",
      buttonAccentHoverText: "#FFFFFF",
      buttonAccentDown: "#004DA3",
      buttonAccentDownText: "#FFFFFF",

      // button - primary (light gray)
      buttonPrimary: "#707070",
      buttonPrimaryText: "#D1D1D1",
      buttonPrimaryHover: "#545454",
      buttonPrimaryHoverText: "#EBEBEB",
      buttonPrimaryDown: "#3F3F3F",
      buttonPrimaryDownText: "#FFFFFF",

      // button - secondary (dark gray)
      buttonSecondary: "#3F3F3F",
      buttonSecondaryText: "#B2B2B2",
      buttonSecondaryHover: "#545454",
      buttonSecondaryHoverText: "#D1D1D1",
      buttonSecondaryDown: "#707070",
      buttonSecondaryDownText: "#EBEBEB",

      // button - negative (red)
      buttonNegative: "#D71913",
      buttonNegativeText: "#FFFFFF",
      buttonNegativeHover: "#BE0303",
      buttonNegativeHoverText: "#FFFFFF",
      buttonNegativeDown: "#A50000",
      buttonNegativeDownText: "#FFFFFF",
    },
    darkest: {
      // surfaces
      background: "#1D1D1D",
      backgroundDeep: "#0E0E0E",
      widgetBackground: "#0E0E0E",
      border: "#303030",
      borderLight: "#4B4B4B",
      inputHoverBg: "#000000",

      // text
      primary: "#D0D0D0",
      secondary: "#B0B0B0",
      arrowsInputNumberColor: "light", //arrows color on input

      // accent (widgets focus / links)
      accent: "#4096F3",
      accentHover: "#5EAAF7",
      accentDown: "#7CBDFA",

      // button - shared disabled
      buttonDisabled: "#303030",
      buttonDisabledText: "#6A6A6A",

      // button - accent (blue)
      buttonAccent: "#066CE7",
      buttonAccentText: "#FFFFFF",
      buttonAccentHover: "#005CC8",
      buttonAccentHoverText: "#FFFFFF",
      buttonAccentDown: "#004EA6",
      buttonAccentDownText: "#FFFFFF",

      // button - primary
      buttonPrimary: "#6A6A6A",
      buttonPrimaryText: "#D0D0D0",
      buttonPrimaryHover: "#4B4B4B",
      buttonPrimaryHoverText: "#EBEBEB",
      buttonPrimaryDown: "#303030",
      buttonPrimaryDownText: "#FFFFFF",

      // button - secondary
      buttonSecondary: "#303030",
      buttonSecondaryText: "#B0B0B0",
      buttonSecondaryHover: "#4B4B4B",
      buttonSecondaryHoverText: "#B0B0B0",
      buttonSecondaryDown: "#6A6A6A",
      buttonSecondaryDownText: "#EBEBEB",

      // button - negative (red)
      buttonNegative: "#DD2118",
      buttonNegativeText: "#FFFFFF",
      buttonNegativeHover: "#C40706",
      buttonNegativeHoverText: "#FFFFFF",
      buttonNegativeDown: "#A70000",
      buttonNegativeDownText: "#FFFFFF",
    },
  },
  win: {
    light: {
      // surfaces
      background: "#F8F8F8",
      backgroundDeep: "#FDFDFD",
      widgetBackground: "#FDFDFD",
      border: "#E6E6E6",
      borderLight: "#D5D5D5",
      inputHoverBg: "#FFFFFF",

      // text
      primary: "#464646",
      secondary: "#6D6D6D",
      arrowsInputNumberColor: "dark", //arrows color on input

      // accent (widgets focus / links)
      accent: "#0067E4",
      accentHover: "#0056BD",
      accentDown: "#0067E4",

      // button - shared disabled
      buttonDisabled: "#B1B1B1",
      buttonDisabledText: "#E6E6E6",

      // button - accent (blue)
      buttonAccent: "#0265DC",
      buttonAccentText: "#FFFFFF",
      buttonAccentHover: "#0054B6",
      buttonAccentHoverText: "#FFFFFF",
      buttonAccentDown: "#004491",
      buttonAccentDownText: "#FFFFFF",

      // button - primary
      buttonPrimary: "#6D6D6D",
      buttonPrimaryText: "#E6E6E6",
      buttonPrimaryHover: "#464646",
      buttonPrimaryHoverText: "#F8F8F8",
      buttonPrimaryDown: "#222222",
      buttonPrimaryDownText: "#FDFDFD",

      // button - secondary
      buttonSecondary: "#E6E6E6",
      buttonSecondaryText: "#6D6D6D",
      buttonSecondaryHover: "#D5D5D5",
      buttonSecondaryHoverText: "#464646",
      buttonSecondaryDown: "#B1B1B1",
      buttonSecondaryDownText: "#303030",

      // button - negative (red)
      buttonNegative: "#E70000",
      buttonNegativeText: "#FFFFFF",
      buttonNegativeHover: "#C50000",
      buttonNegativeHoverText: "#FFFFFF",
      buttonNegativeDown: "#A10000",
      buttonNegativeDownText: "#FFFFFF",
    },
    dark: {
      // surfaces
      background: "#323232",
      backgroundDeep: "#1D1D1D",
      widgetBackground: "#262626",
      border: "#3F3F3F",
      borderLight: "#545454",
      inputHoverBg: "#1D1D1D",

      // text
      primary: "#D1D1D1",
      secondary: "#B2B2B2",
      arrowsInputNumberColor: "light", //arrows color on input

      // accent (widgets focus / links)
      accent: "#2DA5FD",
      accentHover: "#57AFF0",
      accentDown: "#7DCCFF",

      // button - shared disabled (same for all variants)
      buttonDisabled: "#3F3F3F",
      buttonDisabledText: "#707070",

      // button - accent (blue)
      buttonAccent: "#0069E8",
      buttonAccentText: "#FFFFFF",
      buttonAccentHover: "#005BC9",
      buttonAccentHoverText: "#FFFFFF",
      buttonAccentDown: "#004FA9",
      buttonAccentDownText: "#FFFFFF",

      // button - primary (light gray)
      buttonPrimary: "#707070",
      buttonPrimaryText: "#D1D1D1",
      buttonPrimaryHover: "#545454",
      buttonPrimaryHoverText: "#EBEBEB",
      buttonPrimaryDown: "#3F3F3F",
      buttonPrimaryDownText: "#FFFFFF",

      // button - secondary (dark gray)
      buttonSecondary: "#3F3F3F",
      buttonSecondaryText: "#B2B2B2",
      buttonSecondaryHover: "#545454",
      buttonSecondaryHoverText: "#D1D1D1",
      buttonSecondaryDown: "#707070",
      buttonSecondaryDownText: "#EBEBEB",

      // button - negative (red)
      buttonNegative: "#EB0000",
      buttonNegativeText: "#FFFFFF",
      buttonNegativeHover: "#D00000",
      buttonNegativeHoverText: "#FFFFFF",
      buttonNegativeDown: "#B50000",
      buttonNegativeDownText: "#FFFFFF",
    },
    darkest: {
      // surfaces
      background: "#1D1D1D",
      backgroundDeep: "#0E0E0E",
      widgetBackground: "#0E0E0E",
      border: "#303030",
      borderLight: "#4B4B4B",
      inputHoverBg: "#000000",

      // text
      primary: "#D0D0D0",
      secondary: "#B0B0B0",
      arrowsInputNumberColor: "light", //arrows color on input

      // accent (widgets focus / links)
      accent: "#0098FA",
      accentHover: "#3DACFE",
      accentDown: "#66BFFF",

      // button - shared disabled
      buttonDisabled: "#303030",
      buttonDisabledText: "#6A6A6A",

      // button - accent (blue)
      buttonAccent: "#006EEF",
      buttonAccentText: "#FFFFFF",
      buttonAccentHover: "#005ECF",
      buttonAccentHoverText: "#FFFFFF",
      buttonAccentDown: "#0050AC",
      buttonAccentDownText: "#FFFFFF",

      // button - primary
      buttonPrimary: "#6A6A6A",
      buttonPrimaryText: "#D0D0D0",
      buttonPrimaryHover: "#4B4B4B",
      buttonPrimaryHoverText: "#EBEBEB",
      buttonPrimaryDown: "#303030",
      buttonPrimaryDownText: "#FFFFFF",

      // button - secondary
      buttonSecondary: "#303030",
      buttonSecondaryText: "#B0B0B0",
      buttonSecondaryHover: "#4B4B4B",
      buttonSecondaryHoverText: "#B0B0B0",
      buttonSecondaryDown: "#6A6A6A",
      buttonSecondaryDownText: "#EBEBEB",

      // button - negative (red)
      buttonNegative: "#F10000",
      buttonNegativeText: "#FFFFFF",
      buttonNegativeHover: "#D60000",
      buttonNegativeHoverText: "#FFFFFF",
      buttonNegativeDown: "#B70000",
      buttonNegativeDownText: "#FFFFFF",
    },
  },
};

type Palette = (typeof palettes)["mac"]["light"];
type PaletteKey = keyof Palette;

/**
 * PPRO-local CSS var → palette key mapping.
 * Add/remove keys here when PPRO's UI needs different vars exposed.
 */
const varToPaletteKey: Record<string, PaletteKey> = {
  "--uxp-host-background-color": "background",
  "--uxp-host-text-color": "primary",
  "--uxp-host-border-color": "border",
  "--uxp-host-link-text-color": "accent",
  "--uxp-host-link-hover-text-color": "accentHover",
  "--uxp-host-link-active-text-color": "accentDown",
  "--uxp-host-link-disabled-text-color": "buttonDisabledText",
  "--uxp-host-widget-background-color": "widgetBackground",
  "--uxp-host-widget-text-color": "secondary",
  "--uxp-host-widget-border-color": "border",
  "--uxp-host-widget-hover-background-color": "inputHoverBg",
  "--uxp-host-widget-hover-text-color": "primary",
  "--uxp-host-widget-hover-border-color": "borderLight",
  "--uxp-host-widget-selected-border-color": "accent",
  "--uxp-host-widget-disabled-background-color": "buttonDisabled",
  "--uxp-host-widget-disabled-text-color": "buttonDisabledText",
  "--uxp-host-input-number-color-scheme": "arrowsInputNumberColor",

  "--uxp-host-checkbox-background-color": "widgetBackground",
  "--uxp-host-checkbox-border-color": "secondary",
  "--uxp-host-checkbox-fill-color": "secondary",
  "--uxp-host-checkbox-hover-border-color": "primary",
  "--uxp-host-checkbox-hover-fill-color": "primary",
  "--uxp-host-checkbox-down-border-color": "buttonSecondaryDownText",
  "--uxp-host-checkbox-down-fill-color": "buttonSecondaryDownText",
  "--uxp-host-checkbox-disabled-border-color": "buttonDisabledText",
  "--uxp-host-checkbox-disabled-fill-color": "buttonDisabledText",
  "--uxp-host-checkbox-selected-border-color": "accent",

  "--uxp-host-radio-border-color": "secondary",
  "--uxp-host-radio-fill-color": "secondary",
  "--uxp-host-radio-hover-border-color": "primary",
  "--uxp-host-radio-hover-fill-color": "primary",
  "--uxp-host-radio-down-border-color": "buttonSecondaryDownText",
  "--uxp-host-radio-down-fill-color": "buttonSecondaryDownText",
  "--uxp-host-radio-disabled-border-color": "buttonDisabledText",
  "--uxp-host-radio-disabled-fill-color": "buttonDisabledText",
  "--uxp-host-radio-selected-border-color": "accent",

  "--uxp-host-slider-path-color": "borderLight",
  "--uxp-host-slider-thumb-fill-color": "background",
  "--uxp-host-slider-thumb-border-color": "secondary",
  "--uxp-host-slider-thumb-hover-border-color": "buttonSecondaryHoverText",
  "--uxp-host-slider-thumb-disabled-border-color": "borderLight",

  "--uxp-host-text-color-secondary": "secondary",
  "--uxp-host-text-button-text-color": "primary",
  "--uxp-host-heading-text-color": "primary",

  "--uxp-host-button-accent-background-color": "buttonAccent",
  "--uxp-host-button-accent-text-color": "buttonAccentText",
  "--uxp-host-button-accent-hover-background-color": "buttonAccentHover",
  "--uxp-host-button-accent-hover-text-color": "buttonAccentHoverText",
  "--uxp-host-button-accent-down-background-color": "buttonAccentDown",
  "--uxp-host-button-accent-down-text-color": "buttonAccentDownText",
  "--uxp-host-button-accent-disabled-background-color": "buttonDisabled",
  "--uxp-host-button-accent-disabled-text-color": "buttonDisabledText",

  "--uxp-host-button-primary-background-color": "buttonPrimary",
  "--uxp-host-button-primary-text-color": "buttonPrimaryText",
  "--uxp-host-button-primary-hover-background-color": "buttonPrimaryHover",
  "--uxp-host-button-primary-hover-text-color": "buttonPrimaryHoverText",
  "--uxp-host-button-primary-down-background-color": "buttonPrimaryDown",
  "--uxp-host-button-primary-down-text-color": "buttonPrimaryDownText",
  "--uxp-host-button-primary-disabled-background-color": "buttonDisabled",
  "--uxp-host-button-primary-disabled-text-color": "buttonDisabledText",

  "--uxp-host-button-secondary-background-color": "buttonSecondary",
  "--uxp-host-button-secondary-text-color": "buttonSecondaryText",
  "--uxp-host-button-secondary-hover-background-color": "buttonSecondaryHover",
  "--uxp-host-button-secondary-hover-text-color": "buttonSecondaryHoverText",
  "--uxp-host-button-secondary-down-background-color": "buttonSecondaryDown",
  "--uxp-host-button-secondary-down-text-color": "buttonSecondaryDownText",
  "--uxp-host-button-secondary-disabled-background-color": "buttonDisabled",
  "--uxp-host-button-secondary-disabled-text-color": "buttonDisabledText",

  "--uxp-host-button-negative-background-color": "buttonNegative",
  "--uxp-host-button-negative-text-color": "buttonNegativeText",
  "--uxp-host-button-negative-hover-background-color": "buttonNegativeHover",
  "--uxp-host-button-negative-hover-text-color": "buttonNegativeHoverText",
  "--uxp-host-button-negative-down-background-color": "buttonNegativeDown",
  "--uxp-host-button-negative-down-text-color": "buttonNegativeDownText",
  "--uxp-host-button-negative-disabled-background-color": "buttonDisabled",
  "--uxp-host-button-negative-disabled-text-color": "buttonDisabledText",
};

export const premiereproTheme: HostThemeModule = { palettes, varToPaletteKey };
