const WebSocket = require("ws");

const ws = new WebSocket("ws://127.0.0.1:14001/");

ws.on("open", function open() {
  console.log("Connected to WebSocket.");

  const command = {
    command: "loadPlugin",
    params: {
      manifest:
        "C:\\Users\\justin\\Documents\\Dev\\Hyper-Brew\\bolt-uxp\\dist\\manifest.json",
      apps: "PS@25.2.0",
      breakOnStart: true,
    },
  };

  ws.send(JSON.stringify(command));
  console.log("Command sent.");
});

ws.on("error", function error(err) {
  console.error("WebSocket Error:", err.toString());
});

ws.on("message", function incoming(data) {
  console.log("Received:", data.toString());
});

ws.on("close", function close() {
  console.log("WebSocket connection closed.");
});
