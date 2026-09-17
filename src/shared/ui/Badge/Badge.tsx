import cn from 'clsx'
import type { PropsWithChildren } from 'react'

interface BadgeProps {
	className?: string
	variant?: 'default' | 'light'
}

export function Badge({ children, className, variant = 'default' }: PropsWithChildren<BadgeProps>) {
	return (
		<span
			className={cn(
				'flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold shadow-[0_2px_8px_rgba(254,60,114,0.3)]',
				variant === 'default' && 'from-primary to-secondary bg-linear-to-tl text-white',
				variant === 'light' && 'border-border text-border border bg-white',
				className
			)}
		>
			{children}
		</span>
	)
}
