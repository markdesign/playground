import { Request, Response } from 'express';
import { HealthService } from '../services/healthService';

export class HealthController {
    private healthService: HealthService;

    constructor() {
        this.healthService = new HealthService();
    }

    getHealth = async (req: Request, res: Response) => {
        const health = await this.healthService.getHealth();
        res.json(health);
    };
}
