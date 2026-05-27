/*
 *
 *  Can successfully:
 *  - Validate
 *  - Load
 *  - Debug (provides URL for browser, not popup window)
 *  - Unload
 *
 *  Only issue is really this is just sending WS messages to the UDT backend, so the frontend isn't updating. Loading a plugin doesn't update the UDT UI with the debug/unload buttons.
 *
 */

import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const ws = new WebSocket("ws://localhost:14001");
const wsClient = new WebSocket("ws://localhost:54470");

// Test with built Bolt UXP manifest
const manifestStr = fs.readFileSync("./dist/manifest.json", {
  encoding: "utf-8",
});
const manifest = JSON.parse(manifestStr);
const manifestPath = path.join(process.cwd(), "dist");

let reply: null | string = null;
let replyClient: null | string = null;

const wait = (ms: number) =>
  new Promise((resolve, reject) => setTimeout(resolve, ms));

const send = (msg: any) => ws.send(JSON.stringify(msg));
const sendWait = async (msg: any) => {
  send(msg);
  while (reply === null) await wait(100);
  const value = reply;
  reply = null; // reset reply value
  return value;
};

const sendClient = (msg: any) => ws.send(JSON.stringify(msg));
const sendWaitClient = async (msg: any) => {
  sendClient(msg);
  while (replyClient === null) await wait(100);
  const value = replyClient;
  replyClient = null; // reset reply value
  return value;
};

const validate = async () => {
  const validateMsg = {
    command: "proxy",
    clientId: 1,
    message: {
      command: "Plugin",
      action: "validate",
      params: {
        provider: {
          type: "disk",
          path: manifestPath,
        },
      },
      manifest,
    },
    requestId: 22,
  };
  return await sendWait(validateMsg);
};
const validateClient = async () => {
  const validateMsg = {
    command: "Plugin",
    action: "validate",
    params: {
      provider: {
        type: "disk",
        path: manifestPath,
      },
    },
    manifest,
    requestId: 22,
  };
  return await sendWait(validateMsg);
};
const loadClient = async () => {
  const loadMsgClient = {
    command: "Plugin",
    action: "load",
    params: {
      provider: {
        type: "disk",
        path: manifestPath,
      },
    },
    breakOnStart: false,
    isPlaygroundPlugin: false,
    requestId: 37,
  };
  return await sendWaitClient(loadMsgClient);
};
const load = async () => {
  const doubleEscapedPath = manifestPath.replace(/\\/g, "\\\\");
  console.log({ doubleEscapedPath });
  const loadMsg = {
    command: "proxy",
    clientId: 1,
    message: {
      command: "Plugin",
      action: "load",
      params: {
        provider: {
          type: "disk",
          path: doubleEscapedPath,
        },
      },
      breakOnStart: false,
      isPlaygroundPlugin: false,
    },
    requestId: 8,
  };
  const resStr = await sendWait(loadMsg);
  return JSON.parse(resStr) as {
    breakOnStart: boolean;
    command: string;
    pluginSessionId: string;
    requestId: number;
  };
};
const unload = async (pluginSessionId: string) => {
  console.log("sending unload");
  const msg = {
    command: "proxy",
    clientId: 1,
    message: {
      command: "Plugin",
      action: "unload",
      pluginSessionId,
    },
    requestId: 15,
  };
  return await sendWait(msg);
};
const debug = async (pluginSessionId: string) => {
  const msg = {
    command: "proxy",
    clientId: 1,
    message: {
      command: "Plugin",
      action: "debug",
      pluginSessionId,
    },
    requestId: 69,
  };
  const resStr = await sendWait(msg);
  return JSON.parse(resStr) as {
    command: string;
    wsdebugUrl: string;
    chromeDevToolsUrl: string;
    requestId: number;
  };
};

const loadPluginSequence = async () => {
  console.log("1. Validate");
  await validate();

  //? Frontend Update Appears Optional
  // console.log("1A. Validate Client");
  // validateClient();

  console.log("2. Load");
  const loadRes = await load();
  const pluginSessionId = loadRes.pluginSessionId;

  //? Frontend Update Appears Optional
  // console.log("2A. LoadClient");
  // await loadClient();

  await wait(2000);
  console.log("3. debug");
  const debugRes = await debug(pluginSessionId);
  const url = debugRes.chromeDevToolsUrl;
  console.log(`debug at: ${url}`);

  // await wait(2000);
  console.log("4. Unload");
  await unload(pluginSessionId);
};

ws.addEventListener("message", (e: { data: string }) => {
  console.log(`RECEIVED: ${e.data}`);
  const data = JSON.parse(e.data);
  if (data.command === "reply") {
    reply = e.data;
  }
  if (data.command == "ready") {
    send({ command: "ready" });
    loadPluginSequence();
  }
});

ws.addEventListener("open", () => {
  console.log("CONNECTED");
});
ws.addEventListener("error", (e) => {
  console.error(`ERROR`);
});
ws.addEventListener("close", (e) => {
  console.error(`CLOSE`);
});

// Client
wsClient.addEventListener("message", (e: { data: string }) => {
  console.log(`CLIENT: RECEIVED: ${e.data}`);
  const data = JSON.parse(e.data);
  if (data.command === "reply") {
    replyClient = e.data;
  }
  if (data.command == "ready") {
    console.log("client ready");
  }
});

wsClient.addEventListener("open", () => {
  console.log("CLIENT: CONNECTED");
});
wsClient.addEventListener("error", (e) => {
  console.error(`CLIENT: ERROR`, e);
});
wsClient.addEventListener("close", (e) => {
  console.error(`CLIENT: CLOSE`);
});
