// BOLT_SVELTE_START
/// <reference types="svelte" />
// BOLT_SVELTE_END
/// <reference types="vite/client" />

// TODO - not working in Svelte
import { HTMLWebViewElement as UXPHTMLWebViewElement } from "@adobe/cc-ext-uxp-types/uxp/index";

declare global {
  interface Window {
    webview: UXPHTMLWebViewElement;
  }
}
