import type { IProfile } from '@/entities/profile/model/types'
import { mockProfiles } from './mockData'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export interface SwipeResponse {
	success: boolean
	match?: boolean
	matchedProfile?: IProfile
}

export const profilesApi = {
	getProfiles: async (limit = 10, offset = 0): Promise<IProfile[]> => {
		await delay(800)
		return mockProfiles.slice(offset, offset + limit)
	},

	getProfile: async (id: string): Promise<IProfile | null> => {
		await delay(300)
		return mockProfiles.find(p => p.id === id) || null
	},

	swipeProfile: async (profileId: string, action: 'like' | 'dislike' | 'superlike'): Promise<SwipeResponse> => {
		await delay(200)
		const isMatch = action === 'like' && Math.random() < 0.15

		if (isMatch) {
			const matchedProfile = mockProfiles.find(p => p.id === profileId)
			return { success: true, match: true, matchedProfile }
		}

		return { success: true, match: false }
	}
}
