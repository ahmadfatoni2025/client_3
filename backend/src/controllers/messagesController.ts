import { Request, Response } from 'express';
import { supabaseAdmin } from '../config/supabase';

export const getChatGroups = async (req: Request, res: Response) => {
    try {
        const { data, error } = await supabaseAdmin
            .from('chat_groups')
            .select('*')
            .order('last_message_at', { ascending: false });

        if (error) throw error;
        return res.status(200).json({ success: true, data });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return res.status(500).json({ success: false, message });
    }
};

export const getMessagesByGroup = async (req: Request, res: Response) => {
    const { groupId } = req.params;
    try {
        const { data, error } = await supabaseAdmin
            .from('messages')
            .select('*')
            .eq('group_id', groupId)
            .order('created_at', { ascending: true });

        if (error) throw error;
        return res.status(200).json({ success: true, data });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return res.status(500).json({ success: false, message });
    }
};

export const sendMessage = async (req: Request, res: Response) => {
    try {
        const { group_id, sender_id, text, is_me } = req.body;
        const { data, error } = await supabaseAdmin
            .from('messages')
            .insert({ group_id, sender_id, text, is_me })
            .select()
            .single();

        if (error) throw error;

        // Update last message in group
        await supabaseAdmin
            .from('chat_groups')
            .update({
                last_message: text,
                last_message_at: new Date().toISOString()
            })
            .eq('id', group_id);

        return res.status(201).json({ success: true, data });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return res.status(500).json({ success: false, message });
    }
};
