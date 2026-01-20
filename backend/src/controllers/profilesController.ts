// backend/src/controllers/profilesController.ts
import { Request, Response } from 'express';
import { supabaseAdmin } from '../config/supabase';

export const getAllProfiles = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabaseAdmin.from('profil_pengguna').select('*');
    if (error) throw error;
    return res.status(200).json({ success: true, data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({ success: false, message: 'Gagal ambil profil', error: message });
  }
};