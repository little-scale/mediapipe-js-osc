const maxApi = require("max-api");
const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8082 });
maxApi.post("FaceMesh WebSocket server listening on ws://localhost:8082");

wss.on("connection", ws => {
  maxApi.post("FaceMesh client connected");

  ws.on("message", message => {
    try {
      const data = JSON.parse(message); // flat list of x, y, z points
      maxApi.outlet(["/facemesh", ...data]);
    } catch (err) {
      maxApi.post("Error parsing facemesh message: " + err);
    }
  });
});
