import { Router } from 'express';
import { getBudgetOverview, createExpense, deleteExpense } from '../controllers/financeController';

const router = Router();

router.get('/budgets', getBudgetOverview); // GET /api/finance/budgets
router.post('/expenses', createExpense);   // POST /api/finance/expenses
// --- TAMBAHAN BARU ---
router.delete('/expenses/:id', deleteExpense); // Hapus Transaksi

export default router;