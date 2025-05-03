const maxApi = require("max-api");
const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

maxApi.post("WebSocket server listening on ws://localhost:8080");

wss.on("connection", ws => {
  maxApi.post("Client connected");

  ws.on("message", message => {
    try {
      const data = JSON.parse(message); // flat list
      let i = 0;
      let handIndex = 0;

      while (i < data.length) {
        const label = data[i++]; // "Left" or "Right"
        const points = [];

        // 21 landmarks × 3 values (x, y, z)
        for (let j = 0; j < 21 * 3; j++) {
          points.push(data[i++]);
        }

        // send out a single list with hand index and label
        maxApi.outlet([`/hand/${handIndex}/${label.toLowerCase()}`, ...points]);
        handIndex++;
      }
    } catch (err) {
      maxApi.post("Error parsing message: " + err);
    }
  });
});
