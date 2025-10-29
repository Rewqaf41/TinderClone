import type { IProfile, TSwipeAction } from '@/entities/profile'
import { PhotoProgress } from '@/features/photos'
import { ProfileInfo } from '@/features/profile'
import { SwipeOverlay } from '@/features/swipe/ui/SwipeOwerlay'
import { m, type PanInfo } from 'framer-motion'
import { memo, useCallback, useRef, useState } from 'react'

interface ProfileCardProps {
	profile: IProfile
	onSwipe: (action: TSwipeAction) => void
	style?: React.CSSProperties
	zIndex: number
	index: number
}

function ProfileCardComponent({ profile, onSwipe, style, zIndex, index }: ProfileCardProps) {
	const [currentPhoto, setCurrentPhoto] = useState(0)
	const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | 'up' | null>(null)
	const [swipeOpacity, setSwipeOpacity] = useState(0)
	const [isDragging, setIsDragging] = useState(false)

	const cardRef = useRef<HTMLDivElement>(null)
	const startPosRef = useRef({ x: 0, y: 0 })

	// Touch handlers
	const handleTouchStart = useCallback((e: React.TouchEvent) => {
		const touch = e.touches[0]
		startPosRef.current = { x: touch.clientX, y: touch.clientY }
	}, [])

	const handleTouchMove = useCallback((e: React.TouchEvent) => {
		const touch = e.touches[0]
		const deltaX = touch.clientX - startPosRef.current.x
		const deltaY = touch.clientY - startPosRef.current.y

		if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY < -50) {
			setSwipeDirection('up')
			setSwipeOpacity(Math.min(Math.abs(deltaY) / 150, 1))
		} else if (deltaX > 50) {
			setSwipeDirection('right')
			setSwipeOpacity(Math.min(Math.abs(deltaX) / 150, 1))
		} else if (deltaX < -50) {
			setSwipeDirection('left')
			setSwipeOpacity(Math.min(Math.abs(deltaX) / 150, 1))
		} else {
			setSwipeDirection(null)
			setSwipeOpacity(0)
		}
	}, [])

	const handleTouchEnd = useCallback(
		(e: React.TouchEvent) => {
			const touch = e.changedTouches[0]
			const deltaX = touch.clientX - startPosRef.current.x
			const deltaY = touch.clientY - startPosRef.current.y

			if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY < -100) onSwipe('superlike')
			else if (deltaX > 100) onSwipe('like')
			else if (deltaX < -100) onSwipe('dislike')

			setSwipeDirection(null)
			setSwipeOpacity(0)
		},
		[onSwipe]
	)

	// Mouse handlers
	const handleMouseDown = useCallback(
		(e: React.MouseEvent) => {
			if (index !== 0) return
			startPosRef.current = { x: e.clientX, y: e.clientY }
			setIsDragging(true)
		},
		[index]
	)

	const handleMouseMove = useCallback(
		(e: React.MouseEvent) => {
			if (!isDragging) return

			const deltaX = e.clientX - startPosRef.current.x
			const deltaY = e.clientY - startPosRef.current.y

			if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY < -50) {
				setSwipeDirection('up')
				setSwipeOpacity(Math.min(Math.abs(deltaY) / 150, 1))
			} else if (deltaX > 50) {
				setSwipeDirection('right')
				setSwipeOpacity(Math.min(Math.abs(deltaX) / 150, 1))
			} else if (deltaX < -50) {
				setSwipeDirection('left')
				setSwipeOpacity(Math.min(Math.abs(deltaX) / 150, 1))
			} else {
				setSwipeDirection(null)
				setSwipeOpacity(0)
			}
		},
		[isDragging]
	)

	const handleMouseUp = useCallback(
		(e: React.MouseEvent) => {
			if (!isDragging) return

			const deltaX = e.clientX - startPosRef.current.x
			const deltaY = e.clientY - startPosRef.current.y

			if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY < -100) onSwipe('superlike')
			else if (deltaX > 100) onSwipe('like')
			else if (deltaX < -100) onSwipe('dislike')

			setSwipeDirection(null)
			setSwipeOpacity(0)
			setIsDragging(false)
		},
		[isDragging, onSwipe]
	)

	const handlePhotoClick = useCallback(
		(e: React.MouseEvent) => {
			if (index !== 0 || isDragging) return
			const card = cardRef.current
			if (!card) return
			const rect = card.getBoundingClientRect()
			const clickX = e.clientX - rect.left
			const cardWidth = rect.width

			if (clickX < cardWidth / 2) setCurrentPhoto(prev => Math.max(0, prev - 1))
			else setCurrentPhoto(prev => Math.min(profile.photos.length - 1, prev + 1))
		},
		[index, profile.photos.length, isDragging]
	)

	const handleDragEnd = useCallback(
		(_: any, info: PanInfo) => {
			const { offset } = info
			const absX = Math.abs(offset.x)
			const absY = Math.abs(offset.y)

			if (absY > absX && offset.y < -150) onSwipe('superlike')
			else if (offset.x > 150) onSwipe('like')
			else if (offset.x < -150) onSwipe('dislike')
		},
		[onSwipe]
	)

	const exitX = swipeDirection === 'right' ? 1000 : swipeDirection === 'left' ? -1000 : 0
	const exitY = swipeDirection === 'up' ? -1000 : 0

	return (
		<m.div
			ref={cardRef}
			className='absolute inset-0 cursor-grab overflow-hidden rounded-2xl pt-2 shadow-2xl select-none'
			style={{ ...style, zIndex }}
			drag={index === 0}
			dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
			dragElastic={0.7}
			onDragEnd={handleDragEnd}
			whileTap={{ cursor: 'grabbing' }}
			onTouchStart={handleTouchStart}
			onTouchMove={handleTouchMove}
			onTouchEnd={handleTouchEnd}
			onMouseDown={handleMouseDown}
			onMouseMove={handleMouseMove}
			onMouseUp={handleMouseUp}
			onMouseLeave={handleMouseUp}
			exit={{
				x: exitX,
				y: exitY,
				opacity: 0,
				transition: { duration: 0.3 }
			}}
		>
			<div className='relative h-full w-full' onClick={handlePhotoClick}>
				<img
					src={profile.photos[currentPhoto]}
					alt={profile.name}
					className='h-full w-full object-cover'
					draggable={false}
				/>
				<SwipeOverlay direction={swipeDirection} opacity={swipeOpacity} />
				<div className='pointer-events-none absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/70' />
				<div className='pointer-events-none absolute top-0 right-0 left-0 pt-4'>
					<PhotoProgress total={profile.photos.length} current={currentPhoto} />
				</div>
				<div className='absolute right-0 bottom-2 left-0 space-y-3 p-4'>
					<div className='flex items-end justify-between'>
						<ProfileInfo profile={profile} />
					</div>
				</div>
			</div>
		</m.div>
	)
}

export const ProfileCard = memo(ProfileCardComponent)
