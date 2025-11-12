import express from "express";

import elevenLabsSDKRoutes from "./routes/elevenLabsSDKRoutes.js";
import elevenLabsWebSocketRoutes from "./routes/elevenLabsWebSocketRoutes.js";

import openaiRealTimeRoutes from "./routes/openaiRealTimeRoutes.js";
import openaiCLIRoutes from "./routes/openaiCLIRoutes.js";

import azureSDKRoutes from "./routes/azureSDKRoutes.js";
import azureCLIRoutes from "./routes/azureCLIRoutes.js";

import websocketRoutes from "./routes/websocketRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import cors from "cors";
const app = express();

const PORT = process.env.PORT || 8100;

app.use(cors());

app.use(express.json());
app.get("/heartbeat", (req, res) => {
  res.json({ port: PORT, message: "Hello, world!" });
});

app.use("/api/eleven-labs-sdk", elevenLabsSDKRoutes);

app.use("/api/azure-sdk", azureSDKRoutes);
app.use("/api/azure-cli", azureCLIRoutes);

app.use("/api/openai-cli", openaiCLIRoutes);

app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// server.on("upgrade", websocketRoutes.handleUpgrade);

server.on("upgrade", (request, socket, head) => {
  const pathname = new URL(request.url, `http://${request.headers.host}`)
    .pathname;

  console.log("pathname", pathname);
  switch (pathname) {
    case "/eleven-labs-websocket":
      elevenLabsWebSocketRoutes.handleUpgrade(request, socket, head);
      break;
    case "/websocket":
      websocketRoutes.handleUpgrade(request, socket, head);
      break;
    case "/openai-realtime":
      openaiRealTimeRoutes.handleUpgrade(request, socket, head);
      break;
    default:
      socket.destroy();
  }
});

export default app;
