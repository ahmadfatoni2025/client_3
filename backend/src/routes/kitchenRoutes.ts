import { Router } from 'express';
import { getDailyTasks, updateCookingStatus, getLogs } from '../controllers/kitchenController';

const router = Router();

router.get('/tasks', getDailyTasks);       // GET /api/kitchen/tasks
router.get('/logs', getLogs);         // GET /api/kitchen/logs
router.post('/status', updateCookingStatus); // POST /api/kitchen/status

export default router;