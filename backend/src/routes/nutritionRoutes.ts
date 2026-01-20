import { Router } from 'express';
import {
    // Bahan Baku Endpoints
    getAllIngredients,
    getIngredientById,
    createIngredient,
    updateIngredient,
    deleteIngredient,
    updateStock,
    getIngredientsStats,
    getIngredientCategories,

    // Resep Endpoints
    getRecipes,

    // Health Check
    healthCheck
} from '../controllers/nutritionController';

const router = Router();

// ========== ROOT ENDPOINT ==========
router.get('/', (req, res) => {
    res.json({
        success: true,
        service: 'Nutrition & Inventory Management API',
        version: '1.0.0',
        timestamp: new Date().toISOString(),
        endpoints: {
            // Bahan Baku
            getAllIngredients: 'GET    /api/nutrition/ingredients',
            getIngredientById: 'GET    /api/nutrition/ingredients/:id',
            createIngredient: 'POST   /api/nutrition/ingredients',
            updateIngredient: 'PUT    /api/nutrition/ingredients/:id',
            updateStock: 'PATCH   /api/nutrition/ingredients/:id/stock',
            deleteIngredient: 'DELETE /api/nutrition/ingredients/:id',
            getStats: 'GET    /api/nutrition/ingredients/stats/summary',
            getCategories: 'GET    /api/nutrition/ingredients/categories',

            // Resep
            getRecipes: 'GET    /api/nutrition/recipes',

            // Health
            healthCheck: 'GET    /api/nutrition/health'
        }
    });
});

// ========== BAHAN BAKU ROUTES ==========
router.get('/ingredients', getAllIngredients);
router.get('/ingredients/:id', getIngredientById);
router.post('/ingredients', createIngredient);
router.put('/ingredients/:id', updateIngredient);
router.patch('/ingredients/:id', updateIngredient); // Support PATCH for partial updates
router.patch('/ingredients/:id/stock', updateStock);
router.delete('/ingredients/:id', deleteIngredient);
router.get('/ingredients/stats/summary', getIngredientsStats);
router.get('/ingredients/categories', getIngredientCategories);

// ========== RESEP ROUTES ==========
router.get('/recipes', getRecipes);

// ========== HEALTH CHECK ==========
router.get('/health', healthCheck);

export default router;