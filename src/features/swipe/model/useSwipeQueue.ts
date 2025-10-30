import { useCallback, useMemo } from 'react'
import { useProfiles } from './useProfiles'

const MIN_PROFILES_THRESHOLD = 3

export const useSwipeQueue = () => {
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } = useProfiles()

	const profiles = useMemo(() => {
		if (!data?.pages) return []
		return data.pages.flat()
	}, [data])

	const checkAndFetchMore = useCallback(() => {
		if (profiles.length < MIN_PROFILES_THRESHOLD && hasNextPage && !isFetchingNextPage) {
			fetchNextPage()
		}
	}, [profiles.length, hasNextPage, isFetchingNextPage, fetchNextPage])

	return {
		profiles,
		isLoading,
		error,
		checkAndFetchMore,
		hasMore: hasNextPage
	}
}
