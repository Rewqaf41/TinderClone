import cn from 'clsx'
import type { PropsWithChildren } from 'react'

interface BadgeProps {
  className?: string
  variant?: 'default' | 'light'
}

export function Badge({
  children,
  className,
  variant = 'default',
}: PropsWithChildren<BadgeProps>) {
  return (
    <span
      className={cn(
        'flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold shadow-[0_2px_8px_rgba(254,60,114,0.3)]',
        variant === 'default' &&
          'bg-linear-to-tl from-primary to-secondary  text-white',
        variant === 'light' && 'bg-white border border-border text-border',
        className
      )}
    >
      {children}
    </span>
  )
}
