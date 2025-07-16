const maxApi = require("max-api");
const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8084 });
maxApi.post("FaceMesh WebSocket server listening on ws://localhost:8084");

wss.on("connection", ws => {
  maxApi.post("FaceMesh client connected");

  ws.on("message", message => {
    try {
      const data = JSON.parse(message);
      if (data.address && Array.isArray(data.args)) {
        maxApi.outlet([data.address, ...data.args]);
      }
    } catch (err) {
      maxApi.post("Error parsing facemesh message: " + err);
    }
  });
});
