import { create } from 'zustand'
import type { Session } from '../models/session'

interface UserStore {
  user: Session | null
  setUserSession: (userData: Session | null) => void
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUserSession: (userData: Session | null) => { set(() => ({ user: userData })) }
}))
