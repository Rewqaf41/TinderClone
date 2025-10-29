import cn from 'clsx'
import type { ReactNode } from 'react'

interface TagProps {
  children: ReactNode
  variant?: 'default' | 'outline'
  selected?: boolean
  removable?: boolean
  onClick?: () => void
  onRemove?: () => void
  className?: string
}

export function Tag({
  children,
  variant = 'outline',
  selected = false,
  removable = false,
  onClick,
  onRemove,
  className,
}: TagProps) {
  const variantStyles = {
    default: 'bg-zinc-900/80 backdrop-blur-sm border border-zinc-700',
    outline: 'bg-transparent border border-zinc-700',
  }

  const baseStyles = cn(
    'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
    {
      'bg-linear-to-r from-primary to-secondary border-primary text-white shadow-lg shadow-primary/30':
        selected,
      'text-gray-300 hover:border-primary/50 hover:bg-zinc-800/50': !selected,
      'cursor-pointer active:scale-95': onClick,
    },
    !selected && variantStyles[variant],
    className
  )

  return (
    <span className={baseStyles} onClick={onClick}>
      {children}
      {removable && onRemove && (
        <button
          onClick={e => {
            e.stopPropagation()
            onRemove()
          }}
          className="ml-1 w-4 h-4 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
        >
          ×
        </button>
      )}
    </span>
  )
}
