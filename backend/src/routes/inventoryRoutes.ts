import { Router } from 'express';
import { getAllInventory, handleStockOpname } from '../controllers/inventoryController';

const router = Router();

router.get('/', getAllInventory);
router.post('/opname', handleStockOpname);

export default router;
