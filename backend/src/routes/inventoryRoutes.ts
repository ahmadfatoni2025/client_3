// backend/src/routes/inventoryRoutes.ts
import { Router } from 'express';
import { getAllInventory, handleStockOpname } from '../controllers/inventoryController';

const router = Router();

// GET: http://localhost:5000/api/inventory
router.get('/', getAllInventory); 

// POST: http://localhost:5000/api/inventory/opname
router.post('/opname', handleStockOpname);

export default router;