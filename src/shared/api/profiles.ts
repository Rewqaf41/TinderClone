import type { IProfile } from '@/entities/profile/model/types'
import { mockProfiles } from './mockData'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const getProfiles = async (): Promise<IProfile[]> => {
  await delay(800)
  return mockProfiles
}

export const getProfile = async (id: string): Promise<IProfile | null> => {
  await delay(300)
  const profile = mockProfiles.find(p => p.id === id)
  return profile || null
}

export const swipeProfile = async (
  profileId: string,
  action: 'like' | 'dislike' | 'superlike'
): Promise<{ success: boolean; match?: boolean }> => {
  await delay(200)
  const isMatch = action === 'like' && Math.random() < 0.1
  return { success: true, match: isMatch }
}