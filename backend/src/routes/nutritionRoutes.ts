import { Router } from 'express';
import { getRecipes, createMenuPlan } from '../controllers/nutritionController';

const router = Router();

router.get('/recipes', getRecipes);       // GET /api/nutrition/recipes
router.post('/plan', createMenuPlan);     // POST /api/nutrition/plan

export default router;