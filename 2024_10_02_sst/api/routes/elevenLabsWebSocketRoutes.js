import { WebSocketServer } from "ws";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const ELEVENLABS_API_KEYS = process.env.ELEVENLABS_API_KEYS;

const webSocketServer = new WebSocketServer({ noServer: true });

webSocketServer.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", async (message) => {
    try {
      // Send the received audio data to ElevenLabs (replace with the actual API endpoint)
      const response = await axios.post(
        "https://api.elevenlabs.io/speech-to-text",
        message,
        {
          headers: {
            "Content-Type": "audio/webm",
            "x-api-key": ELEVENLABS_API_KEYS,
          },
        }
      );

      // Send the transcription result back to the client
      ws.send(JSON.stringify({ transcription: response.data.transcription }));
    } catch (error) {
      console.error("Error processing audio chunk:");
      ws.send(JSON.stringify({ error: "Transcription failed" }));
    }
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
