import type { IProfile, ISwipeResult, TSwipeAction } from '@/entities/profile/model/types'
import { create } from 'zustand'

interface SwipeState {
  profiles: IProfile[]
  currentIndex: number
  swipeHistory: ISwipeResult[]
  matches: IProfile[]
  isLoading: boolean
  
  // Actions
  setProfiles: (profiles: IProfile[]) => void
  swipeProfile: (action: TSwipeAction) => void
  undoSwipe: () => void
  addMatch: (profile: IProfile) => void
  nextProfile: () => void
  setLoading: (loading: boolean) => void
  reset: () => void
}

export const useSwipeStore = create<SwipeState>((set, get) => ({
  profiles: [],
  currentIndex: 0,
  swipeHistory: [],
  matches: [],
  isLoading: false,

  setProfiles: (profiles) =>
    set({
      profiles,
      currentIndex: 0,
      isLoading: false,
    }),

  swipeProfile: (action) => {
    const { profiles, currentIndex } = get()
    const currentProfile = profiles[currentIndex]

    if (!currentProfile) return

    const result: ISwipeResult = {
      profileId: currentProfile.id,
      action,
    }

    set((state) => ({
      swipeHistory: [...state.swipeHistory, result],
      currentIndex: state.currentIndex + 1,
    }))

    if (action === 'like' && Math.random() < 0.1) {
      get().addMatch(currentProfile)
    }
  },

  undoSwipe: () => {
    const { swipeHistory, currentIndex } = get()
    
    if (swipeHistory.length === 0 || currentIndex === 0) return

    set((state) => ({
      swipeHistory: state.swipeHistory.slice(0, -1),
      currentIndex: Math.max(0, state.currentIndex - 1),
    }))
  },

  addMatch: (profile) =>
    set((state) => ({
      matches: [...state.matches, profile],
    })),

  nextProfile: () =>
    set((state) => ({
      currentIndex: state.currentIndex + 1,
    })),

  setLoading: (loading) =>
    set({ isLoading: loading }),

  reset: () =>
    set({
      profiles: [],
      currentIndex: 0,
      swipeHistory: [],
      isLoading: false,
    }),
}))