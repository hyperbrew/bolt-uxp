import { UXP_Config } from "./types";

//* Mutation polyfill
export const mutationObserverPolyfill = `(function(){var t;null==window.MutationObserver&&(t=function(){function t(t){this.callBack=t}return t.prototype.observe=function(t,n){var e;return this.element=t,this.interval=setInterval((e=this,function(){var t;if((t=e.element.innerHTML)!==e.oldHtml)return e.oldHtml=t,e.callBack.apply(null)}),200)},t.prototype.disconnect=function(){return window.clearInterval(this.interval)},t}(),window.MutationObserver=t)}).call(this);`;

export const polyfills: string = `//* MutationObserver for Vite to work correctly in UXP
(function(){var t;null==window.MutationObserver&&(t=function(){function t(t){this.callBack=t}return t.prototype.observe=function(t,n){var e;return this.element=t,this.interval=setInterval((e=this,function(){var t;if((t=e.element.innerHTML)!==e.oldHtml)return e.oldHtml=t,e.callBack.apply(null)}),200)},t.prototype.disconnect=function(){return window.clearInterval(this.interval)},t}(),window.MutationObserver=t)}).call(this);
`;
export const wsListener = (config: UXP_Config) => {
  return `//* Hot Reload WS Listener for Bolt UXP (dev mode only)
const listenForHotReload=()=>{const reconnect=(reason)=>{console.log(\`Disconnected from hot reload server (\${reason}). Attempting to reconnect in 3 seconds...\`);setTimeout(listenForHotReload,3000)};const ws=new WebSocket(\`ws://localhost:\${${config.hotReloadPort}}\`);ws.onclose=()=>reconnect("closed");ws.onmessage=(event)=>{const data=JSON.parse(event.data);if(data.id==="${config.manifest.id}"&&data.status==="updated"){console.log("⚡hot reloading⚡");location.reload()}}};listenForHotReload();

`;
};
