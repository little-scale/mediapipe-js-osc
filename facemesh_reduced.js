// node.script version for Max, relaying reduced facemesh landmarks from WebSocket to Max outlet

const maxApi = require("max-api");
const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });
maxApi.post("WebSocket server listening on ws://localhost:8080");

wss.on("connection", socket => {
  maxApi.post("WebSocket connection established");

  socket.on("message", msg => {
    try {
      const data = JSON.parse(msg);
      if (!Array.isArray(data)) return;

      // Flattened list of x,y,z values from 13 key landmarks
      maxApi.outlet(["/face", ...data]);
    } catch (e) {
      maxApi.post("Error parsing message: " + e.toString());
    }
  });
});
