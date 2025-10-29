import { create } from 'zustand'

interface IUserPreferences {
  minAge: number
  maxAge: number
  maxDistance: number
  showMe: 'men' | 'women' | 'everyone'
}

interface IUserState {
  preferences: IUserPreferences
  updatePreferences: (preferences: Partial<IUserPreferences>) => void
}

export const useUserStore = create<IUserState>((set) => ({
  preferences: {
    minAge: 18,
    maxAge: 35,
    maxDistance: 50,
    showMe: 'everyone',
  },

  updatePreferences: (preferences) =>
    set((state) => ({
      preferences: {
        ...state.preferences,
        ...preferences,
      },
    })),
}))