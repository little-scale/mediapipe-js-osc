const maxApi = require("max-api");
const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });
maxApi.post("Pose WebSocket server listening on ws://localhost:8080");

wss.on("connection", ws => {
  maxApi.post("Pose client connected");

  ws.on("message", message => {
    try {
      const data = JSON.parse(message); // flat list of pose points
      maxApi.outlet(["/pose", ...data]);
    } catch (err) {
      maxApi.post("Error parsing pose message: " + err);
    }
  });
});
