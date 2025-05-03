// node.script for Max – MediaPipe Holistic OSC routing
const maxApi = require("max-api");
const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8084 });
maxApi.post("Holistic WebSocket server running on ws://localhost:8084");

wss.on("connection", socket => {
  maxApi.post("WebSocket connection established");

  socket.on("message", msg => {
    try {
      const data = JSON.parse(msg);
      if (!Array.isArray(data) || data.length < 2) return;

      const address = data[0];
      const values = data.slice(1);

      // Relay OSC-style message: ["/face", ...values] etc.
      maxApi.outlet([address, ...values]);
    } catch (e) {
      maxApi.post("Error parsing message: " + e.toString());
    }
  });
});
