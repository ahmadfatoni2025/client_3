// backend/src/controllers/inventoryController.ts
import { Request, Response } from 'express';
import { supabaseAdmin } from '../config/supabase';

// --- 1. API UNTUK MENGAMBIL SEMUA DATA STOK (READ) ---
export const getAllInventory = async (req: Request, res: Response) => {
  try {
    // UBAH: ingredients -> bahan_baku
    const { data, error } = await supabaseAdmin
      .from('bahan_baku') 
      .select('*')
      .order('name', { ascending: true }); // Kolom 'name' tetap inggris

    if (error) {
      console.error("🔥 SUPABASE QUERY ERROR:", error);
      throw error;
    }

    return res.status(200).json({
      success: true,
      data: data 
    });

  } catch (error) {
    console.error("💥 SYSTEM ERROR:", error);
    const errorMessage = error instanceof Error ? error.message : JSON.stringify(error);
    
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
    // UBAH: ingredients -> bahan_baku
    const { data: product, error: fetchError } = await supabaseAdmin
      .from('bahan_baku')
      .select('id, name, stock_quantity') // Kolom tetap inggris
      .eq('sku', sku)
      .single();

    if (fetchError || !product) {
      return res.status(404).json({ message: 'Produk tidak ditemukan' });
    }

    // B. Hitung selisih
    const variance = actualQty - product.stock_quantity;

    // C. Update Stok
    // UBAH: ingredients -> bahan_baku
    const { error: updateError } = await supabaseAdmin
      .from('bahan_baku')
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
      // UBAH: inventory_transactions -> riwayat_stok
      await supabaseAdmin.from('riwayat_stok').insert({
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

  } catch (error) { 
    console.error("💥 OPNAME ERROR:", error);
    const errorMessage = error instanceof Error ? error.message : JSON.stringify(error);

    return res.status(500).json({
      success: false, 
      message: 'Terjadi kesalahan sistem',
      error: errorMessage
    });
  }
};