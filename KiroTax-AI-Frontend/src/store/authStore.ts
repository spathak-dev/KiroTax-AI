import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type UserRole = 'owner' | 'practice_head' | 'senior_ca' | 'article' | 'audit' | 'investor' | 'admin' | 'ca' | 'client' | 'auditor'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  company?: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (user: User, token: string) => void
  logout: () => void
  updateUser: (user: Partial<User>) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (user, token) =>
        set({ user, token, isAuthenticated: true }),
      logout: () =>
        set({ user: null, token: null, isAuthenticated: false }),
      updateUser: (userData) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        })),
    }),
    {
      name: 'auth-storage',
    }
  )
)
