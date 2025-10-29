import type { TSwipeAction } from '@/entities/profile'
import { actionButtons } from '../model/buttons'

interface ActionButtonsProps {
	onAction: (action: TSwipeAction) => void
}

export function ActionButtons({ onAction }: ActionButtonsProps) {
	return (
		<div className='flex h-24 w-full items-center justify-center gap-6 bg-black px-4'>
			{actionButtons.map(({ action, ring, size, svg }) => (
				<button
					key={action}
					onClick={() => onAction(action)}
					className={`${size} ${ring} flex items-center justify-center rounded-full bg-transparent transition-all duration-300 focus:outline-none active:scale-90`}
				>
					{svg}
				</button>
			))}
		</div>
	)
}
