import { Router } from 'express';
import { getAllProcurements, createProcurement, updateProcurementStatus } from '../controllers/procurementController';

const router = Router();

router.get('/', getAllProcurements);
router.post('/', createProcurement);
router.patch('/:id/status', updateProcurementStatus);

export default router;
