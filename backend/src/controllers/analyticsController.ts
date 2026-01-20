import { Request, Response } from 'express';
import { supabaseAdmin } from '../config/supabase';

export const getGlobalStats = async (req: Request, res: Response) => {
    try {
        // Total Portions (sum from menu_plans)
        const { data: portionsData, error: portionsError } = await supabaseAdmin
            .from('menu_plans')
            .select('target_portions');

        if (portionsError) throw portionsError;
        const totalPortions = portionsData.reduce((acc, curr) => acc + (curr.target_portions || 0), 0);

        // Total Recipes
        const { count: recipeCount, error: recipeError } = await supabaseAdmin
            .from('recipes')
            .select('*', { count: 'exact', head: true });

        if (recipeError) throw recipeError;

        // Total Ingredients
        const { count: ingredientCount, error: ingredientError } = await supabaseAdmin
            .from('ingredients')
            .select('*', { count: 'exact', head: true });

        if (ingredientError) throw ingredientError;

        // Expenses total
        const { data: expenseData, error: expenseError } = await supabaseAdmin
            .from('expenses')
            .select('amount');

        if (expenseError) throw expenseError;
        const totalExpenses = expenseData.reduce((acc, curr) => acc + (curr.amount || 0), 0);

        return res.status(200).json({
            success: true,
            data: {
                totalPortions,
                recipeCount,
                ingredientCount,
                totalExpenses
            }
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return res.status(500).json({ success: false, message });
    }
};
