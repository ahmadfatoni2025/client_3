import { Request, Response } from 'express';
import { supabaseAdmin } from '../config/supabase';

// ========== ROOT/HEALTH CHECK ==========
export const getFinanceApiInfo = async (req: Request, res: Response) => {
  try {
    // Test database connection
    const { data: budgetsCount, error: budgetsError } = await supabaseAdmin
      .from('anggaran')
      .select('*', { count: 'exact', head: true });

    const { data: expensesCount, error: expensesError } = await supabaseAdmin
      .from('pengeluaran')
      .select('*', { count: 'exact', head: true });

    const dbStatus = (budgetsError || expensesError) ? 'DISCONNECTED' : 'CONNECTED';

    return res.status(200).json({
      success: true,
      service: 'Finance Management API',
      status: 'HEALTHY',
      timestamp: new Date().toISOString(),
      database: dbStatus,
      statistics: {
        budgets: budgetsCount?.length || 0,
        expenses: expensesCount?.length || 0
      },
      endpoints: [
        'GET    /api/finance',
        'GET    /api/finance/budgets',
        'GET    /api/finance/budgets/:id',
        'POST   /api/finance/expenses',
        'GET    /api/finance/expenses',
        'GET    /api/finance/expenses/:id',
        'GET    /api/finance/summary',
        'GET    /api/finance/report'
      ]
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({
      success: false,
      service: 'Finance Management API',
      status: 'UNHEALTHY',
      timestamp: new Date().toISOString(),
      error: message
    });
  }
};

// ========== BUDGET ENDPOINTS ==========

// 1. GET: Ambil Data Anggaran (RAB) buat Dashboard
export const getBudgetOverview = async (req: Request, res: Response) => {
  try {
    // Ambil data anggaran
    const { data: budgets, error } = await supabaseAdmin
      .from('anggaran')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Hitung total budget
    const totalBudget = budgets?.reduce((sum, budget) => sum + (budget.amount || 0), 0) || 0;

    return res.status(200).json({
      success: true,
      data: budgets,
      summary: {
        totalBudgets: budgets?.length || 0,
        totalAmount: totalBudget,
        currency: 'IDR'
      }
    });
  } catch (error) {
    console.error('Error in getBudgetOverview:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({
      success: false,
      message: 'Gagal mengambil data anggaran',
      error: message
    });
  }
};

// 2. GET: Ambil Detail Anggaran by ID
export const getBudgetById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'ID anggaran harus disertakan'
      });
    }

    const { data: budget, error } = await supabaseAdmin
      .from('anggaran')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({
          success: false,
          message: 'Anggaran tidak ditemukan'
        });
      }
      throw error;
    }

    return res.status(200).json({
      success: true,
      data: budget
    });
  } catch (error) {
    console.error('Error in getBudgetById:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({
      success: false,
      message: 'Gagal mengambil detail anggaran',
      error: message
    });
  }
};

// ========== EXPENSE ENDPOINTS ==========

// 3. POST: Input Belanja Baru (Upload Struk)
export const createExpense = async (req: Request, res: Response) => {
  try {
    const { budgetId, title, amount, transactionDate, userId, description, receiptUrl } = req.body;

    // Validasi input
    const errors: string[] = [];
    if (!budgetId) errors.push('budgetId harus diisi');
    if (!title) errors.push('title harus diisi');
    if (!amount) errors.push('amount harus diisi');
    if (!transactionDate) errors.push('transactionDate harus diisi');
    if (!userId) errors.push('userId harus diisi');

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validasi gagal',
        errors
      });
    }

    // Validasi amount numeric
    const amountNum = Number(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Amount harus berupa angka positif'
      });
    }

    // Cek apakah budget ada
    const { data: budget, error: budgetError } = await supabaseAdmin
      .from('anggaran')
      .select('id, amount, remaining_amount')
      .eq('id', budgetId)
      .single();

    if (budgetError || !budget) {
      return res.status(404).json({
        success: false,
        message: 'Anggaran tidak ditemukan'
      });
    }

    // Input ke tabel expenses
    const { data, error } = await supabaseAdmin
      .from('pengeluaran')
      .insert({
        budget_id: budgetId,
        title: title.trim(),
        amount: amountNum,
        description: description?.trim(),
        transaction_date: transactionDate,
        receipt_url: receiptUrl,
        created_by: userId,
        status: 'PENDING',
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error (createExpense):', error);
      throw error;
    }

    // Update remaining amount di budget (optional)
    const newRemaining = (budget.remaining_amount || budget.amount) - amountNum;
    await supabaseAdmin
      .from('anggaran')
      .update({ remaining_amount: Math.max(0, newRemaining) })
      .eq('id', budgetId);

    return res.status(201).json({
      success: true,
      message: 'Laporan belanja berhasil disimpan',
      data: {
        ...data,
        budget_remaining: newRemaining
      }
    });
  } catch (error) {
    console.error('Error in createExpense:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({
      success: false,
      message: 'Gagal menyimpan belanja',
      error: message
    });
  }
};

// 4. GET: Ambil Daftar Pengeluaran
export const getExpenses = async (req: Request, res: Response) => {
  try {
    const { budgetId, startDate, endDate, status, limit = 50, page = 1 } = req.query;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const offset = (pageNumber - 1) * limitNumber;

    let query = supabaseAdmin
      .from('pengeluaran')
      .select(`
        *,
        anggaran (
          id,
          name,
          category
        )
      `, { count: 'exact' })
      .order('transaction_date', { ascending: false })
      .order('created_at', { ascending: false });

    // Filter
    if (budgetId && typeof budgetId === 'string') {
      query = query.eq('budget_id', budgetId);
    }

    if (status && typeof status === 'string') {
      query = query.eq('status', status);
    }

    if (startDate && typeof startDate === 'string') {
      query = query.gte('transaction_date', startDate);
    }

    if (endDate && typeof endDate === 'string') {
      query = query.lte('transaction_date', endDate);
    }

    // Pagination
    query = query.range(offset, offset + limitNumber - 1);

    const { data, error, count } = await query;

    if (error) throw error;

    // Hitung total pengeluaran
    const totalExpenses = data?.reduce((sum, expense) => sum + (expense.amount || 0), 0) || 0;

    return res.status(200).json({
      success: true,
      data: data || [],
      summary: {
        totalExpenses: count || 0,
        totalAmount: totalExpenses,
        averageExpense: data?.length ? totalExpenses / data.length : 0
      },
      pagination: {
        page: pageNumber,
        limit: limitNumber,
        totalItems: count || 0,
        totalPages: Math.ceil((count || 0) / limitNumber)
      }
    });
  } catch (error) {
    console.error('Error in getExpenses:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({
      success: false,
      message: 'Gagal mengambil data pengeluaran',
      error: message
    });
  }
};

// 5. GET: Ambil Summary Keuangan
export const getFinanceSummary = async (req: Request, res: Response) => {
  try {
    // Get total budget
    const { data: budgets, error: budgetError } = await supabaseAdmin
      .from('anggaran')
      .select('amount, remaining_amount');

    if (budgetError) throw budgetError;

    // Get total expenses
    const { data: expenses, error: expenseError } = await supabaseAdmin
      .from('pengeluaran')
      .select('amount, status');

    if (expenseError) throw expenseError;

    // Calculate totals
    const totalBudget = budgets?.reduce((sum, b) => sum + (b.amount || 0), 0) || 0;
    const totalRemaining = budgets?.reduce((sum, b) => sum + (b.remaining_amount || b.amount || 0), 0) || 0;
    const totalSpent = expenses?.reduce((sum, e) => sum + (e.amount || 0), 0) || 0;

    // Expenses by status
    const pendingExpenses = expenses?.filter(e => e.status === 'PENDING').length || 0;
    const approvedExpenses = expenses?.filter(e => e.status === 'APPROVED').length || 0;

    return res.status(200).json({
      success: true,
      data: {
        budgets: {
          total: totalBudget,
          remaining: totalRemaining,
          spent: totalBudget - totalRemaining,
          utilizationRate: totalBudget > 0 ? ((totalBudget - totalRemaining) / totalBudget * 100).toFixed(2) : 0
        },
        expenses: {
          total: totalSpent,
          count: expenses?.length || 0,
          byStatus: {
            pending: pendingExpenses,
            approved: approvedExpenses,
            rejected: (expenses?.length || 0) - pendingExpenses - approvedExpenses
          }
        },
        overview: {
          availableBalance: totalRemaining,
          monthlyAverage: totalSpent / 12, // Jika ada data bulanan
          lastUpdated: new Date().toISOString()
        }
      }
    });
  } catch (error) {
    console.error('Error in getFinanceSummary:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({
      success: false,
      message: 'Gagal mengambil summary keuangan',
      error: message
    });
  }
};

// 6. GET: Generate Finance Report
export const getFinanceReport = async (req: Request, res: Response) => {
  try {
    const { year, month } = req.query;

    // Logic untuk report bulanan/tahunan
    // (Implementasi berdasarkan kebutuhan)

    return res.status(200).json({
      success: true,
      message: 'Report endpoint - under development',
      filters: { year, month },
      data: []
    });
  } catch (error) {
    console.error('Error in getFinanceReport:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({
      success: false,
      message: 'Gagal generate report',
      error: message
    });
  }
};