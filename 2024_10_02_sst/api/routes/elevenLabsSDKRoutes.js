import express from "express";
import dotenv from "dotenv";
import multer from "multer";
import { ElevenLabsClient } from "elevenlabs";
import { Readable } from "stream";

const router = express.Router();
dotenv.config();

const upload = multer();

router.post("/", async (req, res) => {
  console.log("POST /elevenLabsSDKRoutes");
  const ELEVENLABS_API_KEYS = process.env.ELEVENLABS_API_KEYS;

  // Initialize ElevenLabs client
  const elevenlabs = new ElevenLabsClient({
    apiKey: ELEVENLABS_API_KEYS,
  });

  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    // Generate audio from text
    const audioStream = await elevenlabs.generate({
      voice: "Rachel",
      text: text,
      model_id: "eleven_multilingual_v2",
    });

    // Convert stream to buffer
    const chunks = [];
    for await (const chunk of audioStream) {
      chunks.push(chunk);
    }
    const audioBuffer = Buffer.concat(chunks);

    // Convert buffer to base64
    const base64Audio = audioBuffer.toString("base64");

    res.json({ audio: base64Audio });
  } catch (error) {
    console.error("Error generating speech:", error);
    res.status(500).json({ error: "Failed to generate speech" });
  }
});

export default router;
