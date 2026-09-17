import { memo, useMemo } from 'react'

interface PhotoProgressProps {
	total: number
	current: number
}

const PhotoProgressComponent = ({ total, current }: PhotoProgressProps) => {
	const bars = useMemo(() => {
		return Array.from({ length: total }).map((_, i) => (
			<div key={i} className='h-1 flex-1 overflow-hidden rounded-full bg-white/30'>
				<div
					className='h-full rounded-full bg-white'
					style={{ width: i <= current ? '100%' : 0, transition: 'width 0.3s' }}
				/>
			</div>
		))
	}, [total, current])

	return <div className='flex gap-1 px-2'>{bars}</div>
}

export const PhotoProgress = memo(PhotoProgressComponent)
