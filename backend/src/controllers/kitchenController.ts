import { Request, Response } from 'express';
import { supabaseAdmin } from '../config/supabase';

// 1. GET: Ambil Jadwal Masak Hari Ini
export const getDailyTasks = async (req: Request, res: Response) => {
  try {
    // Ambil menu_plans yang tanggalnya hari ini (simplifikasi: ambil semua yg statusnya belum DONE)
    const { data, error } = await supabaseAdmin
      .from('rencana_menu')
      .select(`
        id,
        meal_time,
        target_portions,
        status,
        recipes ( name )
      `)
      .neq('status', 'DONE'); // Ambil yang belum selesai

    if (error) throw error;

    return res.status(200).json({ success: true, data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({ success: false, message: 'Gagal ambil jadwal dapur', error: message });
  }
};

// 2. POST: Update Status Masak (Persiapan -> Memasak -> Packing)
export const updateCookingStatus = async (req: Request, res: Response) => {
  const { menuPlanId, status, chefId } = req.body; // chefId sekarang akan TERPAKAI

  try {
    // A. Update status di tabel menu_plans
    const { error: updateError } = await supabaseAdmin
      .from('rencana_menu')
      .update({ status })
      .eq('id', menuPlanId);

    if (updateError) throw updateError;

    // B. Catat Log Aktivitas (Supaya chefId jadi kepake & data lebih lengkap)
    // Kita catat: "Chef X mengubah status menu Y jadi Z"
    if (chefId) {
      await supabaseAdmin.from('catatan_dapur').insert({
        menu_plan_id: menuPlanId,
        status: status,
        chef_id: chefId, // <--- NAH, DI SINI DIA KEPAKE
        actual_portions: 0 // Default dulu
      });
    }

    return res.status(200).json({
      success: true,
      message: `Status berhasil diupdate ke ${status}`
    });

  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({
      success: false,
      message: 'Gagal update status',
      error: message
    });
  }
};

// 3. GET: Ambil Log Aktivitas Dapur
export const getLogs = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('kitchen_logs')
      .select(`
        id,
        created_at,
        status,
        actual_portions,
        menu_plans ( recipes ( name ) ),
        profiles ( full_name )
      `)
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) throw error;
    return res.status(200).json({ success: true, data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({ success: false, message: 'Gagal ambil log dapur', error: message });
  }
};