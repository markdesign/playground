import express from "express";
const router = express.Router();
import multer from "multer";
import { Readable } from "stream";
import FormData from "form-data";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const upload = multer({ storage: multer.memoryStorage() });

const OPENAI_API_KEY = process.env.OPENAI_API_KEY

router.post("/", upload.single("audio"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No audio file provided" });
  }

  try {
    const formData = new FormData();

    const audioStream = new Readable();
    audioStream.push(req.file.buffer);
    audioStream.push(null);

    formData.append("file", audioStream, {
      filename: "audio.webm",
      contentType: "audio/webm",
    });
    formData.append("model", "whisper-1");

    const response = await axios.post(
      "https://api.openai.com/v1/audio/transcriptions",
      formData,
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          ...formData.getHeaders(),
        },
      }
    );

    res.json({ text: response.data.text });
  } catch (error) {
    console.error("Error transcribing audio");
    res.status(500).json({ error: "Error transcribing audio" });
  }
});

export default router;
