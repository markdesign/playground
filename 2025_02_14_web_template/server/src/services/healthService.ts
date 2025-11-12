import { readFileSync } from 'fs';
import { join } from 'path';

export class HealthService {
    async getHealth() {
        const packageJson = JSON.parse(readFileSync(join(__dirname, '../../package.json'), 'utf8'));

        return {
            status: 'healthy',
            timestamp: new Date().toISOString(),
            version: packageJson.version,
            serverUptime: process.uptime(),
        };
    }
}
