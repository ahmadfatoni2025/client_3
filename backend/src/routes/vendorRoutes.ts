import { Router } from 'express';
import { getAllVendors, createVendor, updateVendor, deleteVendor } from '../controllers/vendorController';

const router = Router();

router.get('/', getAllVendors);
router.post('/', createVendor);
router.put('/:id', updateVendor);
router.delete('/:id', deleteVendor);

export default router;
