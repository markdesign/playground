import { Request, Response, NextFunction } from 'express';
import { synthesizeGeminiMultiSpeaker } from '../services/geminiTtsService';

export async function postGeminiTts(req: Request, res: Response, next: NextFunction) {
    try {
        const { prompt, text, speakers, languageCode, modelName, sampleRateHertz } = req.body || {};
        if (!text || typeof text !== 'string' || text.length > 5000) {
            return res.status(400).json({ error: 'Invalid text (required, max 5000 chars).' });
        }
        if (!prompt || typeof prompt !== 'string') {
            return res.status(400).json({ error: 'Invalid prompt (required string).' });
        }
        if (!Array.isArray(speakers) || speakers.length === 0) {
            return res.status(400).json({ error: 'Speakers array required.' });
        }
        const projectId = 'cogex-tts-2025-10'; //process.env.GOOGLE_PROJECT_ID;
        if (!projectId) {
            return res.status(500).json({ error: 'Server missing GOOGLE_PROJECT_ID env var.' });
        }
        const audioContent = await synthesizeGeminiMultiSpeaker(
            {
                prompt,
                text,
                speakers,
                languageCode,
                modelName,
                sampleRateHertz,
            },
            projectId
        );
        res.json({ audioContent });
    } catch (err) {
        next(err);
    }
}
