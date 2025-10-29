import cn from 'clsx'
import type { ReactNode } from 'react'
import { memo, useCallback } from 'react'

interface TagProps {
	children: ReactNode
	variant?: 'default' | 'outline' | 'swipe'
	selected?: boolean
	removable?: boolean
	onClick?: () => void
	onRemove?: () => void
	className?: string
}

function TagComponent({
	children,
	variant = 'default',
	selected = false,
	removable = false,
	onClick,
	onRemove,
	className
}: TagProps) {
	const handleRemove = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			e.stopPropagation()
			onRemove?.()
		},
		[onRemove]
	)

	const variantStyles = {
		default: 'bg-zinc-900/80 backdrop-blur-sm border border-zinc-700 py-2',
		outline: 'bg-transparent border border-zinc-700 py-2',
		swipe: 'bg-[#505965] border border-white py-1 text-[15px] font-bold'
	}

	const baseStyles = cn(
		'inline-flex items-center gap-2 px-4 rounded-full text-sm font-medium transition-all duration-200',
		{
			'bg-linear-to-r from-primary to-secondary border-primary text-white shadow-lg shadow-primary/30': selected,
			'text-gray-300 hover:border-primary/50 hover:bg-zinc-800/50': !selected,
			'cursor-pointer active:scale-95': !!onClick
		},
		!selected && variantStyles[variant],
		className
	)

	return (
		<span className={baseStyles} onClick={onClick}>
			{children}
			{removable && onRemove && (
				<button
					onClick={handleRemove}
					className='ml-1 flex h-4 w-4 items-center justify-center rounded-full transition-colors hover:bg-white/20'
				>
					×
				</button>
			)}
		</span>
	)
}

export const Tag = memo(TagComponent)
