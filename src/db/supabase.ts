import { createClient } from '@supabase/supabase-js'

export const supabase = createClient('https://bgzfyfewmubtufothqnd.supabase.co', import.meta.env.VITE_SUPABASE_KEY)
