import type { TSwipeAction } from '@/entities/profile'
import { useSwipeHistory, useSwipeQueue } from '@/features/swipe'
import { useSwipeProfile } from '@/features/swipe/model/useProfiles'
import { ActionButtons } from '@/widgets/ProfileAction'
import { ProfileCard } from '@/widgets/ProfileCard'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export function SwipePage() {
	const { profiles, isLoading, checkAndFetchMore } = useSwipeQueue()
	const { addToHistory, getLastProfile, removeLastFromHistory, canRewind } = useSwipeHistory()
	const swipeMutation = useSwipeProfile()

	const [currentProfiles, setCurrentProfiles] = useState(profiles.slice(0, 2))

	useEffect(() => {
		setCurrentProfiles(profiles.slice(0, 2))
	}, [profiles])

	useEffect(() => {
		checkAndFetchMore()
	}, [profiles.length, checkAndFetchMore])

	const handleSwipe = async (action: TSwipeAction) => {
		if (action === 'rewind') {
			if (!canRewind) return

			const prevProfile = getLastProfile()
			setCurrentProfiles(prev => [prevProfile, ...prev])
			removeLastFromHistory()
			return
		}

		const swipedProfile = currentProfiles[0]
		if (!swipedProfile) return

		addToHistory(swipedProfile)

		if (action === 'like' || action === 'dislike' || action === 'superlike') {
			swipeMutation.mutate({
				profileId: swipedProfile.id,
				action: action
			})
		}

		setTimeout(() => {
			setCurrentProfiles(prev => {
				const newProfiles = prev.slice(1)
				const nextProfiles = profiles.slice(newProfiles.length, newProfiles.length + 2)
				return [...newProfiles, ...nextProfiles].slice(0, 2)
			})

			checkAndFetchMore()
		}, 100)
	}

	if (isLoading) {
		return <div className='flex h-screen w-full items-center justify-center text-white'>Загрузка...</div>
	}

	if (profiles.length === 0) {
		return (
			<div className='flex h-screen w-full flex-col items-center justify-center text-white'>
				<p className='mb-4 text-xl'>Профили закончились</p>
				<p className='text-gray-400'>Попробуйте позже</p>
			</div>
		)
	}

	return (
		<div className='mx-auto flex w-full max-w-md flex-col' style={{ height: `calc(100vh - 48px)` }}>
			<div className='relative flex-1 overflow-hidden'>
				<AnimatePresence mode='wait' initial={false}>
					{currentProfiles.map((profile, idx) => (
						<ProfileCard
							key={profile.id}
							profile={profile}
							onSwipe={handleSwipe}
							index={idx}
							zIndex={3 - idx}
							style={{
								transform: `scale(${1 - idx * 0.05}) translateY(${idx * -10}px)`,
								pointerEvents: idx === 0 ? 'auto' : 'none'
							}}
						/>
					))}
				</AnimatePresence>
			</div>

			<ActionButtons onAction={handleSwipe} />
		</div>
	)
}
