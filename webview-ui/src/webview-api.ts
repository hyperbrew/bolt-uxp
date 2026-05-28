export const pingWebview = () => {
  console.log("pingWebview called");
  return "hello from webview";
};

// Applies the host's theme to <html> so the webview's SCSS picks it up
export const updateColorScheme = (val: {
  theme: string;
  host?: string | null;
  colors: Record<string, string>;
  spectrumStyle?: boolean;
}) => {
  const { theme, host, colors, spectrumStyle } = val;
  console.log("update color scheme", theme, host, colors);

  //set CSS vars like --uxp-host-background-color
  const root = document.querySelector(":root") as HTMLElement;
  for (const key in colors) {
    root.style.setProperty(key, colors[key]);
  }

  // toggle bundled spectrum element styles via class on <html>
  document.documentElement.classList.toggle("spectrum-style", !!spectrumStyle);

  return "hello from webview";
};
