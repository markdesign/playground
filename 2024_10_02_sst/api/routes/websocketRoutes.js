import { WebSocketServer } from "ws";

const webSocketServer = new WebSocketServer({ noServer: true });

webSocketServer.on("connection", (ws) => {
  console.log("New client connected");

  ws.on("message", (message) => {
    console.log(`Received: ${message}`);
    ws.send(`This is from server. You said: ${message}`);
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

export default {
  wss: webSocketServer,
  handleUpgrade: (request, socket, head) => {
    webSocketServer.handleUpgrade(request, socket, head, (ws) => {
      webSocketServer.emit("connection", ws, request);
    });
  },
};
