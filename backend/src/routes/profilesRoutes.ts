// backend/src/routes/profilesRoutes.ts
import { Router } from 'express';
// Pastikan path '../controllers/profilesController' ini benar mengarah ke file di atas
import { getAllProfiles } from '../controllers/profilesController';

const router = Router();

router.get('/', getAllProfiles);

export default router;