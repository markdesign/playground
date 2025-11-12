import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { healthRoutes } from './routes/healthRoutes';
import { ttsRoutes } from './routes/ttsRoutes';
import { errorHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/requestLogger';

const app = express();
const port = process.env.PORT || 4200;

// Security middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Logging
app.use(requestLogger);

// Routes
app.use('/api/v1/health', healthRoutes);
app.use('/api/v1/tts', ttsRoutes);

// Error handling
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
