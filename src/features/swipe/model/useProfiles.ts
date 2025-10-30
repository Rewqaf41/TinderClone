import type { IProfile } from '@/entities/profile/model/types'
import { profilesApi, type SwipeResponse } from '@/shared/api/profiles'
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'

const PROFILES_PER_PAGE = 10

export const SWIPE_QUERY_KEY = ['profiles', 'swipe'] as const

interface InfiniteProfilesData {
	pages: IProfile[][]
	pageParams: unknown[]
}

export const useProfiles = () => {
	return useInfiniteQuery({
		queryKey: SWIPE_QUERY_KEY,
		queryFn: ({ pageParam = 0 }) => profilesApi.getProfiles(PROFILES_PER_PAGE, pageParam as number),
		getNextPageParam: (lastPage, allPages) => {
			if (lastPage.length === 0) return undefined
			return allPages.length * PROFILES_PER_PAGE
		},
		initialPageParam: 0,
		staleTime: 5 * 60 * 1000,
		gcTime: 10 * 60 * 1000
	})
}

export const useSwipeProfile = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({ profileId, action }: { profileId: string; action: 'like' | 'dislike' | 'superlike' }) =>
			profilesApi.swipeProfile(profileId, action),

		onSuccess: (data: SwipeResponse, variables) => {
			queryClient.setQueryData<InfiniteProfilesData>(SWIPE_QUERY_KEY, old => {
				if (!old) return old

				return {
					...old,
					pages: old.pages.map(page => page.filter(profile => profile.id !== variables.profileId))
				}
			})

			if (data.match && data.matchedProfile) {
				// TODO: Добавить в matches query
				console.log('Match!', data.matchedProfile)
			}
		}
	})
}
