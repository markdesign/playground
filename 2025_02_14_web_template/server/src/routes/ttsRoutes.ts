import { Router } from 'express';
import { postGeminiTts } from '../controllers/ttsController';

export const ttsRoutes = Router();

// Cast due to Express 5 type inference quirk with async handlers
ttsRoutes.post('/gemini', postGeminiTts as any);
