import { Router } from 'express';
import { getGlobalStats } from '../controllers/analyticsController';

const router = Router();

router.get('/stats', getGlobalStats);

export default router;
