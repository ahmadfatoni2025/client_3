import { Router } from 'express';
import {
    getFinanceApiInfo,
    getBudgetOverview,
    getBudgetById,
    createExpense,
    getExpenses,
    getFinanceSummary,
    getFinanceReport
} from '../controllers/financeController';

const router = Router();

// ========== ROOT ENDPOINT ==========
router.get('/', getFinanceApiInfo);           // GET /api/finance

// ========== BUDGET ENDPOINTS ==========
router.get('/budgets', getBudgetOverview);    // GET /api/finance/budgets
router.get('/budgets/:id', getBudgetById);    // GET /api/finance/budgets/:id

// ========== EXPENSE ENDPOINTS ==========
router.post('/expenses', createExpense);      // POST /api/finance/expenses
router.get('/expenses', getExpenses);         // GET /api/finance/expenses

// ========== SUMMARY & REPORT ==========
router.get('/summary', getFinanceSummary);    // GET /api/finance/summary
router.get('/report', getFinanceReport);      // GET /api/finance/report

export default router;