import type { IRegistrationData, IUser } from '@/entities/user/model/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  user: IUser | null
  isAuthenticated: boolean
  registrationStep: number
  registrationData: Partial<IRegistrationData>
  
  setUser: (user: IUser) => void
  logout: () => void
  setRegistrationStep: (step: number) => void
  updateRegistrationData: (data: Partial<IRegistrationData>) => void
  completeRegistration: (finalData: IRegistrationData) => void
  resetRegistration: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      registrationStep: 0,
      registrationData: {},

      setUser: (user) =>
        set({
          user,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
          registrationStep: 0,
          registrationData: {},
        }),

      setRegistrationStep: (step) =>
        set({ registrationStep: step }),

      updateRegistrationData: (data) =>
        set((state) => ({
          registrationData: {
            ...state.registrationData,
            ...data,
          },
        })),

      completeRegistration: (finalData) =>
        set({
          user: {
            id: crypto.randomUUID(),
            ...finalData,
            age: 25,
          },
          isAuthenticated: true,
          registrationStep: 0,
          registrationData: {},
        }),

      resetRegistration: () =>
        set({
          registrationStep: 0,
          registrationData: {},
        }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)