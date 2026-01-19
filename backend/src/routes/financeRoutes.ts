import { Router } from 'express';
import { getBudgetOverview, createExpense } from '../controllers/financeController';

const router = Router();

router.get('/budgets', getBudgetOverview); // GET /api/finance/budgets
router.post('/expenses', createExpense);   // POST /api/finance/expenses

export default router;