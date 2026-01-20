import { Request, Response } from 'express';
import { supabaseAdmin } from '../config/supabase';

export const getAllProcurements = async (req: Request, res: Response) => {
    try {
        const { data, error } = await supabaseAdmin
            .from('purchase_orders')
            .select('*, vendors(name)')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return res.status(200).json({ success: true, data });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return res.status(500).json({ success: false, message });
    }
};

export const createProcurement = async (req: Request, res: Response) => {
    try {
        const { data, error } = await supabaseAdmin
            .from('purchase_orders')
            .insert(req.body)
            .select()
            .single();

        if (error) throw error;
        return res.status(201).json({ success: true, message: 'PO berhasil dibuat', data });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return res.status(500).json({ success: false, message });
    }
};

export const updateProcurementStatus = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const { data, error } = await supabaseAdmin
            .from('purchase_orders')
            .update({ status })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return res.status(200).json({ success: true, message: 'Status PO diperbarui', data });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return res.status(500).json({ success: false, message });
    }
};
