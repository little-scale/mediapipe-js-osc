const maxApi = require("max-api");
const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8086 });
maxApi.post("Pose WebSocket server listening on ws://localhost:8086");

wss.on("connection", ws => {
  maxApi.post("Pose client connected");

  ws.on("message", message => {
    try {
      const data = JSON.parse(message);
      if (data.address && Array.isArray(data.args)) {
        maxApi.outlet([data.address, ...data.args]);
      }
    } catch (err) {
      maxApi.post("Error parsing pose message: " + err);
    }
  });
});
