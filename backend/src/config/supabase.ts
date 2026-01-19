import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

// 1. URL (Dari data yang kamu kirim)
const supabaseUrl = "https://ldvnibllmlgiminyiwwt.supabase.co"; 

// 2. KEY SERVICE_ROLE (Dari data yang kamu kirim)
// Ini sudah benar, pastikan tercopy semua sampai huruf terakhir '...-8UxY'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxkdm5pYmxsbWxnaW1pbnlpd3d0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODgxNDI0NiwiZXhwIjoyMDg0MzkwMjQ2fQ.zmYY-Ma-7WuJvTSC46_WOcBcrUCnwRc22tq2tQ-8UxY";

// 3. EXPORT (Ini yang bikin error tadi hilang)
// Kata kunci 'export' WAJIB ada biar bisa dipanggil sama Controller
export const supabaseAdmin = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});