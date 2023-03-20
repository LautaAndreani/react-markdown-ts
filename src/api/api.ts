import { supabase } from '../db/supabase'

import type { PostgrestSingleResponse } from '@supabase/supabase-js'

export const api = {
  saveContent: async (RAWinput: string, userId: string): Promise<PostgrestSingleResponse<null>> => {
    const saveInDB = await supabase.from('content').insert({ user: userId, content: RAWinput })
    return saveInDB
  }
}
