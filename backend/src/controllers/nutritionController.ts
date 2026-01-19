import { Request, Response } from 'express';
import { supabaseAdmin } from '../config/supabase';

// 1. GET: Ambil Daftar Menu / Resep
export const getRecipes = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('recipes')
      .select('*, recipe_ingredients(ingredients(name, unit, calories))'); // Join tabel

    if (error) throw error;

    return res.status(200).json({ success: true, data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({ success: false, message: 'Gagal ambil resep', error: message });
  }
};

// 2. POST: Buat Rencana Menu Baru
export const createMenuPlan = async (req: Request, res: Response) => {
  const { date, mealTime, recipeId, targetPortions } = req.body;
  try {
    const { data, error } = await supabaseAdmin
      .from('menu_plans')
      .insert({
        date,
        meal_time: mealTime,
        recipe_id: recipeId,
        target_portions: targetPortions,
        status: 'PLANNED'
      })
      .select()
      .single();

    if (error) throw error;

    return res.status(201).json({ success: true, message: 'Menu berhasil direncanakan', data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({ success: false, message: 'Gagal buat menu', error: message });
  }
};