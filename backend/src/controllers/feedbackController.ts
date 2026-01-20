import { Request, Response } from 'express';
import { supabaseAdmin } from '../config/supabase';

export const getAllFeedbacks = async (req: Request, res: Response) => {
    try {
        const { data, error } = await supabaseAdmin
            .from('feedbacks')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return res.status(200).json({ success: true, data });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return res.status(500).json({ success: false, message });
    }
};

export const createFeedback = async (req: Request, res: Response) => {
    try {
        const { data, error } = await supabaseAdmin
            .from('feedbacks')
            .insert(req.body)
            .select()
            .single();

        if (error) throw error;
        return res.status(201).json({ success: true, data });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return res.status(500).json({ success: false, message });
    }
};
