import { InfoBadge } from '@/shared/ui'
import { useState } from 'react'
import { useSwipeable } from 'react-swipeable'

interface PreviewCardProps {
	photos: string[]
}

export function PreviewCard({ photos }: PreviewCardProps) {
	const [activePhoto, setActivePhoto] = useState(0)

	const swipeHandlers = useSwipeable({
		onSwipedLeft: () => setActivePhoto(prev => (prev + 1) % photos.length),
		onSwipedRight: () => setActivePhoto(prev => (prev - 1 + photos.length) % photos.length),
		preventScrollOnSwipe: true,
		trackMouse: true
	})

	return (
		<div className='flex flex-1 flex-col items-center justify-center p-3'>
			<div
				{...swipeHandlers}
				className='relative w-full max-w-md touch-pan-y overflow-hidden rounded-md'
				style={{ height: 'calc(100vh - 120px)' }}
			>
				{photos.length > 0 && (
					<div className='absolute inset-0 px-3 pt-2 pb-[50px]'>
						<img
							src={photos[activePhoto]}
							alt={`Photo ${activePhoto + 1}`}
							className='h-full w-full rounded-md object-cover'
						/>
					</div>
				)}

				{photos.length > 1 && (
					<div className='absolute top-4 right-0 left-0 z-10 flex justify-center gap-1 px-4'>
						{photos.map((_, i) => (
							<div key={i} className={`h-1 flex-1 rounded-full ${i === activePhoto ? 'bg-white' : 'bg-[#505965]'}`} />
						))}
					</div>
				)}

				<div className='absolute bottom-8 left-0 z-10 flex w-full items-end justify-between bg-linear-to-t from-black/60 to-transparent p-6'>
					<h2 className='text-2xl font-bold text-white'>Luna 23</h2>
					<InfoBadge onClick={() => {}} />
				</div>
			</div>
		</div>
	)
}
