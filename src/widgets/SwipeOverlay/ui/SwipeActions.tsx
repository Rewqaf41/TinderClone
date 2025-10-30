import { Button } from '@/shared/ui'

interface SwipeActionsProps {
	onAction: (action: 'like' | 'dislike' | 'superlike') => void
}

export const SwipeActions = ({ onAction }: SwipeActionsProps) => {
	return (
		<div className='relative z-10 flex items-center justify-center gap-6 border-t border-white/5 bg-[#1C1F26] px-4 py-6'>
			<Button
				size='lg'
				onClick={() => onAction('dislike')}
				aria-label='Dislike'
				className='h-14 w-14 bg-white text-[#FF3B30] shadow-[0_4px_16px_rgba(255,59,48,0.2)] transition-all hover:-translate-y-0.5 hover:scale-105 hover:shadow-[0_6px_20px_rgba(255,59,48,0.3)] active:translate-y-0 active:scale-95'
			>
				<svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
					<path d='M18 6L6 18M6 6l12 12' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' />
				</svg>
			</Button>

			<Button
				size='lg'
				onClick={() => onAction('superlike')}
				aria-label='Super Like'
				className='h-12 w-12 bg-white text-[#00D4FF] shadow-[0_4px_16px_rgba(0,212,255,0.2)] transition-all hover:-translate-y-0.5 hover:scale-105 hover:shadow-[0_6px_20px_rgba(0,212,255,0.3)] active:translate-y-0 active:scale-95'
			>
				<svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
					<path
						d='M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z'
						fill='currentColor'
					/>
				</svg>
			</Button>

			<Button
				size='lg'
				onClick={() => onAction('like')}
				aria-label='Like'
				className='h-16 w-16 bg-white text-[#00D4A1] shadow-[0_4px_16px_rgba(0,212,161,0.2)] transition-all hover:-translate-y-0.5 hover:scale-105 hover:shadow-[0_6px_20px_rgba(0,212,161,0.3)] active:translate-y-0 active:scale-95'
			>
				<svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
					<path
						d='M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z'
						fill='currentColor'
					/>
				</svg>
			</Button>
		</div>
	)
}
