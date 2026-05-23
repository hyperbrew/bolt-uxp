//* Reference the UDT Devtools CLI repo: https://github.com/adobe-uxp/devtools-cli
//* The repo seems abandoned and cannot be installed due to conflicting packages with node-gyp and electron versions (needing Node 12 and node 14 simultaneously)

//* It seems that we establish a WS connection to UDT and can send various commands, however none of them are working aside from the initial connect

//* Currently only getting response on initial connection: RECEIVED: {"command":"ready"}

const ws = new WebSocket("ws://localhost:14001");

const send = (msg: any) => ws.send(JSON.stringify(msg));
const sendRaw = (msg: any) => ws.send(msg);

const discover = () => {
  console.log("sending discover");
  send({ command: "Plugin", action: "discover" });
};
const load = () => {
  console.log("sending load");
  const msg = {
    command: "Plugin",
    action: "load",
    params: {
      provider: {
        type: "disk",
        // path: "C:\\Users\\Justin\\Documents\\dev\\hyper-brew\\bolt-uxp\\dist",
        // path: "C:/Users/Justin/Documents/dev/hyper-brew/bolt-uxp/dist",
        // path: "C:/Users/Justin/Documents/dev/hyper-brew/bolt-uxp/dist/manifest.json",
        path: "C:\\Users\\Justin\\Documents\\dev\\hyper-brew\\bolt-uxp\\dist\\manifest.json",
      },
    },
    breakOnStart: true,
  };
  send(msg);
};
const unload = () => {
  console.log("sending unload");
  send({ command: "Plugin", action: "discover" });
};
const list = () => {
  console.log("sending list");
  send({ command: "Plugin", action: "list" });
};

ws.addEventListener("message", (e) => {
  console.log(`RECEIVED: ${e.data}`);
  const data = JSON.parse(e.data);
  if (data.command == "ready") {
    console.log("ready reply");
    send({ command: "ready" });
    // setTimeout(discover, 1000);
    // setTimeout(load, 2000);
    setTimeout(list, 2000);
    // setTimeout(unload, 4000);
  }
});

ws.addEventListener("open", () => {
  console.log("CONNECTED");
  //   pingInterval = setInterval(() => {
  //     log(`SENT: ping: ${counter}`);
  //     websocket.send("ping");
  //   }, 1000);
});
ws.addEventListener("error", (e) => {
  console.error(`ERROR`);
});
ws.addEventListener("close", (e) => {
  console.error(`CLOSE`);
});
