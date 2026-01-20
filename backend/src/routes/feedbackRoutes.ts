import { Router } from 'express';
import { getAllFeedbacks, createFeedback } from '../controllers/feedbackController';

const router = Router();

router.get('/', getAllFeedbacks);
router.post('/', createFeedback);

export default router;
