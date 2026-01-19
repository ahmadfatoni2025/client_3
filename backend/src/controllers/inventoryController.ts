// backend/src/controllers/inventoryController.ts
import { Request, Response } from 'express';
import { supabaseAdmin } from '../config/supabase';

// --- 1. API UNTUK MENGAMBIL SEMUA DATA STOK (READ) ---
export const getAllInventory = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('ingredients')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      console.error("🔥 SUPABASE QUERY ERROR:", error);
      throw error;
    }

    return res.status(200).json({
      success: true,
      data: data 
    });

  } catch (error) { // <--- HAPUS ": any", BIARKAN KOSONG (Ini Fix-nya)
    console.error("💥 SYSTEM ERROR:", error);

    // TypeScript otomatis menganggap 'error' sebagai unknown
    // Kita cek dulu apakah error ini Error beneran atau Object aneh dari Supabase
    const errorMessage = error instanceof Error 
      ? error.message 
      : JSON.stringify(error); 
    
    return res.status(500).json({
      success: false,
      message: 'Gagal mengambil data stok',
      error: errorMessage 
    });
  }
};

// --- 2. API UNTUK STOK OPNAME (UPDATE) ---
export const handleStockOpname = async (req: Request, res: Response) => {
  const { sku, actualQty, userId, notes } = req.body;

  try {
    // A. Cek barang
    const { data: product, error: fetchError } = await supabaseAdmin
      .from('ingredients')
      .select('id, name, stock_quantity')
      .eq('sku', sku)
      .single();

    if (fetchError || !product) {
      return res.status(404).json({ message: 'Produk tidak ditemukan' });
    }

    // B. Hitung selisih
    const variance = actualQty - product.stock_quantity;

    // C. Update Stok
    const { error: updateError } = await supabaseAdmin
      .from('ingredients')
      .update({ 
        stock_quantity: actualQty, 
        last_stock_opname: new Date().toISOString()
      })
      .eq('id', product.id);

    if (updateError) {
      console.error("🔥 Update Stok Error:", updateError);
      throw updateError;
    }

    // D. Catat Log Transaksi
    if (variance !== 0) {
      await supabaseAdmin.from('inventory_transactions').insert({
        ingredient_id: product.id,
        type: 'ADJUSTMENT',
        quantity: variance,
        created_by: userId,
        notes: notes || `Stok Opname: Sistem ${product.stock_quantity} -> Fisik ${actualQty}`
      });
    }

    return res.status(200).json({
      success: true,
      message: `Stok berhasil diupdate.`,
      variance: variance
    });

  } catch (error) { // <--- HAPUS ": any" DI SINI JUGA
    console.error("💥 OPNAME ERROR:", error);
    
    const errorMessage = error instanceof Error 
      ? error.message 
      : JSON.stringify(error);

    return res.status(500).json({
      success: false, 
      message: 'Terjadi kesalahan sistem',
      error: errorMessage
    });
  }
};