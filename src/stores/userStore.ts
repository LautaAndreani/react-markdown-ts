import { create } from 'zustand'
import type { Session } from '../models/session'

import sessionMock from '../mock/session.json'
import { supabase } from '../db/supabase'

interface UserStore {
  user: Session | null
  setUserSession: (userData: Session | null) => void
  getSession: () => Promise<void>
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUserSession: (userData: Session | null) => {
    set(() => ({ user: userData }))
  },
  getSession: async () => {
    try {
      if (import.meta.env.DEV) {
        set(() => ({ user: sessionMock }))
        return
      }
      const { data } = await supabase.auth.getSession()

      if (data.session === null) {
        set(() => ({ user: null }))
        return
      }
      set(() => ({ user: data.session as unknown as Session }))
    } catch (error) {
      console.error(error)
    }
  }
}))
