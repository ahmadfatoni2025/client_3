import { Request, Response } from 'express';
import { supabaseAdmin } from '../config/supabase';

export const getAllVendors = async (req: Request, res: Response) => {
    try {
        const { data, error } = await supabaseAdmin
            .from('vendors')
            .select('*')
            .order('name', { ascending: true });

        if (error) throw error;
        return res.status(200).json({ success: true, data });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return res.status(500).json({ success: false, message });
    }
};

export const createVendor = async (req: Request, res: Response) => {
    try {
        const { data, error } = await supabaseAdmin
            .from('vendors')
            .insert(req.body)
            .select()
            .single();

        if (error) throw error;
        return res.status(201).json({ success: true, message: 'Pemasok berhasil ditambahkan', data });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return res.status(500).json({ success: false, message });
    }
};

export const updateVendor = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { id: _, ...updateData } = req.body;
    try {
        const { data, error } = await supabaseAdmin
            .from('vendors')
            .update(updateData)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return res.status(200).json({ success: true, message: 'Data pemasok diperbarui', data });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return res.status(500).json({ success: false, message });
    }
};

export const deleteVendor = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const { error } = await supabaseAdmin
            .from('vendors')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return res.status(200).json({ success: true, message: 'Pemasok berhasil dihapus' });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return res.status(500).json({ success: false, message });
    }
};
