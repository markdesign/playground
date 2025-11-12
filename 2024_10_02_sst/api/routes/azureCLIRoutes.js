import express from "express";
const router = express.Router();
import axios from "axios";
import multer from "multer";
import dotenv from "dotenv";
dotenv.config();

const AZURE_API_KEY = process.env.AZURE_API_KEY;
const AZURE_REGION = process.env.AZURE_REGION;

const upload = multer();

router.post("/", upload.single("audioData"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No audio file received");
  }

  const inputMimeType = req.body.mimeType || req.file.mimetype;
  console.log("[azureCLIRoutes.js 21] inputMimeType : ", inputMimeType);

  console.log("Received audio data:", {
    mimetype: inputMimeType,
    size: req.file.size,
  });

  try {
    const response = await axios.post(
      `https://${AZURE_REGION}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=en-US`,
      req.file.buffer,
      {
        headers: {
          "Ocp-Apim-Subscription-Key": AZURE_API_KEY,
          "Content-Type": inputMimeType,
        },
      }
    );

    console.log("Azure API response:", response.data);
    res.json(response.data);
  } catch (error) {
    console.error("Error from Azure API:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
    });
    res.status(500).json({
      error: "Speech recognition failed",
      details: error.response?.data || error.message,
    });
  }
});

export default router;
