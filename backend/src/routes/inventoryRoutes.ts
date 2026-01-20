// backend/src/routes/inventoryRoutes.ts
import { Router } from 'express';
import { getAllInventory, handleStockOpname, updateItem, deleteItem } from '../controllers/inventoryController';

const router = Router();

// GET: http://localhost:5000/api/inventory
router.get('/', getAllInventory); 

// POST: http://localhost:5000/api/inventory/opname
router.post('/opname', handleStockOpname);

// --- TAMBAHAN BARU ---
router.put('/:id', updateItem);    // Edit Barang
router.delete('/:id', deleteItem); // Hapus Barang

export default router;