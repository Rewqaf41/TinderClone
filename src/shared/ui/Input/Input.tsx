import cn from 'clsx'
import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	error?: string
}

export function Input({ className, error, ...props }: InputProps) {
	return (
		<div className='w-full'>
			<input
				className={cn(
					'w-full rounded-xl border bg-zinc-900 px-6 py-4 text-xl text-white',
					'transition-colors focus:outline-none',
					error ? 'border-red-500' : 'border-zinc-800 focus:border-zinc-700',
					className
				)}
				{...props}
			/>
			{error && <p className='mt-2 text-sm text-red-500'>{error}</p>}
		</div>
	)
}
