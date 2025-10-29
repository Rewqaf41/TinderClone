import type { IProfile, TSwipeAction } from '@/entities/profile'
import { mockProfiles } from '@/shared/api/mockData'
import { ActionButtons } from '@/widgets/ProfileAction/ui/ActionButtons'
import { ProfileCard } from '@/widgets/ProfileCard'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export function SwipePage() {
	const [profiles, setProfiles] = useState<IProfile[]>([])
	const [currentIndex, setCurrentIndex] = useState(0)
	const [history, setHistory] = useState<IProfile[]>([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const timer = setTimeout(() => {
			setProfiles(mockProfiles.slice(0, 3))
			setIsLoading(false)
		}, 1500)
		return () => clearTimeout(timer)
	}, [])

	const handleSwipe = (action: TSwipeAction) => {
		if (action === 'rewind') {
			if (history.length === 0) return
			const prevProfile = history[history.length - 1]
			setProfiles(prev => [prevProfile, ...prev])
			setHistory(prev => prev.slice(0, -1))
			setCurrentIndex(prev => Math.max(0, prev - 1))
			return
		}

		const swipedProfile = profiles[0]
		setHistory(prev => [...prev, swipedProfile])

		setTimeout(() => {
			setProfiles(prev => {
				const newProfiles = prev.slice(1)
				if (newProfiles.length < 2) {
					const next = mockProfiles.slice(currentIndex + 3, currentIndex + 6)
					return [...newProfiles, ...next]
				}
				return newProfiles
			})
			setCurrentIndex(prev => prev + 1)
		}, 100)
	}

	return (
		<div className='mx-auto flex w-full max-w-md flex-col' style={{ height: `calc(100vh - 48px)` }}>
			<div className='relative flex-1 overflow-hidden'>
				{isLoading ? (
					<div className='flex h-full w-full items-center justify-center text-white'>Загрузка...</div>
				) : (
					<AnimatePresence mode='wait' initial={false}>
						{profiles.slice(0, 2).map((profile, idx) => (
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
				)}
			</div>

			<ActionButtons onAction={handleSwipe} />
		</div>
	)
}
