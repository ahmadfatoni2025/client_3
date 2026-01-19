import { Router } from 'express';
import { getDailyTasks, updateCookingStatus } from '../controllers/kitchenController';

const router = Router();

router.get('/tasks', getDailyTasks);       // GET /api/kitchen/tasks
router.post('/status', updateCookingStatus); // POST /api/kitchen/status

export default router;