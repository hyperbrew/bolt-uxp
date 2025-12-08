export const pingWebview = () => {
  console.log("pingWebview called");
  return "hello from webview";
};

export const updateColorScheme = (val: {
  theme: string;
  colors: {
    "--uxp-host-background-color": string;
    "--uxp-host-text-color": string;
    "--uxp-host-border-color": string;
    "--uxp-host-link-text-color": string;
    "--uxp-host-widget-hover-background-color": string;
    "--uxp-host-widget-hover-text-color": string;
    "--uxp-host-widget-hover-border-color": string;
    "--uxp-host-text-color-secondary": string;
    "--uxp-host-link-hover-text-color": string;
    "--uxp-host-label-text-color": string;
  };
}) => {
  const { theme, colors } = val;
  console.log("update color scheme", theme, colors);
  const root = document.querySelector(":root") as HTMLElement;
  for (const key in colors) {
    //@ts-ignore
    const color = colors[key];
    root.style.setProperty(key, color);
  }
  return "hello from webview";
};
