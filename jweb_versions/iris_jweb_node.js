const maxApi = require("max-api");
const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8083 });
maxApi.post("Iris Tracking WebSocket server listening on ws://localhost:8083");

wss.on("connection", ws => {
  maxApi.post("Iris Tracking client connected");

  ws.on("message", message => {
    try {
      const data = JSON.parse(message);
      if (data.address && Array.isArray(data.args)) {
        maxApi.outlet([data.address, ...data.args]);
      }
    } catch (err) {
      maxApi.post("Error parsing iris message: " + err);
    }
  });
});
