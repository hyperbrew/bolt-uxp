import { UXP_Config } from "./types";

// Required for Svelte 5 compatibility
const htmlMediaElementPolyfill = `//* HTMLMediaElement blank polyfill for UXP
try{window.HTMLMediaElement = function() {};}catch(e){}`;

// Required for Svelte 5 compatibility
const microtaskPolyfill = `//* Microtask polyfill for UXP
if (typeof queueMicrotask !== "function") { window.queueMicrotask = function (fn) { Promise.resolve().then(fn).catch((err) => setTimeout(() => { throw err; }));  }; }`;

// Required for Svelte 5 compatibility
const templateElementPolyfill = `//* Template polyfill for UXP
(function () {
  if ("content" in document.createElement("template")) return;
  const origCreateElement = document.createElement;
  document.createElement = function (tagName, ...args) {
    const lowerTag = tagName.toLowerCase();
    if (lowerTag === "template") {
      const fakeTemplate = origCreateElement.call(document, "div");
      const content = document.createDocumentFragment();
      Object.defineProperty(fakeTemplate, "content", {
        get() { return content; },
      });
      Object.defineProperty(fakeTemplate, "innerHTML", {
        set(html) {
          const tempDiv = origCreateElement.call(document, "div");
          tempDiv.innerHTML = html;
          // Clear previous content
          while (content.firstChild) content.removeChild(content.firstChild);
          // Move parsed nodes into the content fragment
          while (tempDiv.firstChild) {
            content.appendChild(tempDiv.firstChild);
          }
        },
        get() { return ""; },
      });
      return fakeTemplate;
    }
    return origCreateElement.call(document, tagName, ...args);
  };
})();
`;

// Required for Vite compatibility
const mutationObserverPolyfill: string = `//* MutationObserver for Vite to work correctly in UXP
(function(){var t;null==window.MutationObserver&&(t=function(){function t(t){this.callBack=t}return t.prototype.observe=function(t,n){var e;return this.element=t,this.interval=setInterval((e=this,function(){var t;if((t=e.element.innerHTML)!==e.oldHtml)return e.oldHtml=t,e.callBack.apply(null)}),200)},t.prototype.disconnect=function(){return window.clearInterval(this.interval)},t}(),window.MutationObserver=t)}).call(this);
`;

export const polyfills = [
  htmlMediaElementPolyfill,
  microtaskPolyfill,
  templateElementPolyfill,
  mutationObserverPolyfill,
].join("\n");

export const wsListener = (config: UXP_Config) => {
  return `//* Hot Reload WS Listener for Bolt UXP (dev mode only)
const listenForHotReload=()=>{const reconnect=(reason)=>{console.log(\`Disconnected from hot reload server (\${reason}). Attempting to reconnect in 3 seconds...\`);setTimeout(listenForHotReload,3000)};const ws=new WebSocket(\`ws://localhost:\${${config.hotReloadPort}}\`);ws.onclose=()=>reconnect("closed");ws.onmessage=(event)=>{const data=JSON.parse(event.data);if(data.id==="${config.manifest.id}"&&data.status==="updated"){console.log("⚡hot reloading⚡");location.reload()}}};listenForHotReload();

`;
};
