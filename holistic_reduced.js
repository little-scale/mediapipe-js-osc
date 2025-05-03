// File: holistic-reduced-server.js (for use in Max with node.script)
const WebSocket = require("ws");
const maxApi = require("max-api");

const wss = new WebSocket.Server({ port: 8083 });

wss.on("connection", function connection(ws) {
  maxApi.post("🔗 Client connected to holistic reduced server");
  ws.on("message", function incoming(message) {
    try {
      const data = JSON.parse(message);
      if (Array.isArray(data) && typeof data[0] === "string") {
        maxApi.outlet(data[0], ...data.slice(1));
      }
    } catch (e) {
      maxApi.post("❌ Error parsing message: " + e.message);
    }
  });
});
