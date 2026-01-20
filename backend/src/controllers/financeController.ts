import { Request, Response } from 'express';
import { supabaseAdmin } from '../config/supabase';

// 1. GET: Ambil Data Anggaran (RAB) buat Dashboard
export const getBudgetOverview = async (req: Request, res: Response) => {
  try {
    // Ambil data anggaran
    const { data: budgets, error } = await supabaseAdmin
      .from('anggaran')
      .select('*');

    if (error) throw error;

    return res.status(200).json({ success: true, data: budgets });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({ success: false, message, error: message });
  }
};

// 2. POST: Input Belanja Baru (Upload Struk)
export const createExpense = async (req: Request, res: Response) => {
  const { budgetId, title, amount, transactionDate, userId } = req.body;
  try {
    // Input ke tabel expenses
    const { data, error } = await supabaseAdmin
      .from('pengeluaran')
      .insert({
        budget_id: budgetId,
        title,
        amount,
        transaction_date: transactionDate,
        created_by: userId,
        status: 'PENDING'
      })
      .select()
      .single();

    if (error) throw error;

    return res.status(201).json({ success: true, message: 'Laporan belanja tersimpan', data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({ success: false, message: 'Gagal simpan belanja', error: message });
  }
};