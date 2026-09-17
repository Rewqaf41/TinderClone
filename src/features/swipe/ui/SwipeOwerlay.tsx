import { Heart, Star, X } from 'lucide-react'

interface SwipeOverlayProps {
	direction: 'left' | 'right' | 'up' | null
	opacity: number
}

export function SwipeOverlay({ direction, opacity }: SwipeOverlayProps) {
	if (!direction || opacity === 0) return null

	const config = {
		left: {
			icon: X,
			color: 'from-red-500/90 to-pink-500/90',
			text: 'NOPE',
			rotation: -30
		},
		right: {
			icon: Heart,
			color: 'from-green-400/90 to-emerald-500/90',
			text: 'LIKE',
			rotation: 30
		},
		up: {
			icon: Star,
			color: 'from-blue-400/90 to-cyan-500/90',
			text: 'SUPER LIKE',
			rotation: 0
		}
	}

	const { icon: Icon, color, text, rotation } = config[direction]

	return (
		<div style={{ opacity }} className='pointer-events-none absolute inset-0 z-10 flex items-center justify-center'>
			<div
				style={{ transform: `rotate(${rotation}deg)` }}
				className={`bg-linear-to-br ${color} rounded-2xl border-4 border-white px-8 py-4 shadow-2xl`}
			>
				<div className='flex items-center gap-3'>
					<Icon className='h-8 w-8 text-white' strokeWidth={3} />
					<span className='text-3xl font-black tracking-wider text-white'>{text}</span>
				</div>
			</div>
		</div>
	)
}
