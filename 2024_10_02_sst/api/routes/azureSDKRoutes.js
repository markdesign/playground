import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import multer from "multer";

const router = express.Router();
dotenv.config();

const upload = multer();

router.get("/get-speech-token", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const AZURE_API_KEY = process.env.AZURE_API_KEY;
  const AZURE_REGION = process.env.AZURE_REGION;

  // Improved environment variable check
  if (
    !AZURE_API_KEY ||
    AZURE_API_KEY === "paste-your-speech-key-here" ||
    !AZURE_REGION ||
    AZURE_REGION === "paste-your-speech-region-here"
  ) {
    return res.status(400).json({
      error: "You forgot to add your speech key or region to the .env file.",
    });
  } else {
    const headers = {
      headers: {
        "Ocp-Apim-Subscription-Key": AZURE_API_KEY,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    try {
      const tokenResponse = await axios.post(
        `https://${AZURE_REGION}.api.cognitive.microsoft.com/sts/v1.0/issueToken`,
        null,
        headers
      );
      return res.json({ token: tokenResponse.data, region: AZURE_REGION });
    } catch (err) {
      console.error("Authorization error:", err); // Log the error for debugging
      return res
        .status(401)
        .json({ error: "There was an error authorizing your speech key." });
    }
  }
});

export default router;
