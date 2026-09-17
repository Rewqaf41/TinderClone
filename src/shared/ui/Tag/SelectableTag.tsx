import cn from 'clsx'
import type { ReactNode } from 'react'

interface SelectableTagProps {
	children: ReactNode
	selected?: boolean
	onClick?: () => void
}

export function SelectableTag({ children, selected = false, onClick }: SelectableTagProps) {
	return (
		<button
			onClick={onClick}
			className={cn(
				'rounded-full border px-5 py-3 text-base transition-all',
				selected
					? 'border-pink-500 bg-pink-500 text-white'
					: 'border-zinc-700 bg-transparent text-gray-300 hover:border-zinc-600'
			)}
		>
			{children}
		</button>
	)
}
