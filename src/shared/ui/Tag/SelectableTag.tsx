import cn from 'clsx'
import type { ReactNode } from 'react'

interface SelectableTagProps {
  children: ReactNode
  selected?: boolean
  onClick?: () => void
}

export function SelectableTag({
  children,
  selected = false,
  onClick,
}: SelectableTagProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'px-5 py-3 rounded-full text-base border transition-all',
        selected
          ? 'bg-pink-500 border-pink-500 text-white'
          : 'bg-transparent border-zinc-700 text-gray-300 hover:border-zinc-600'
      )}
    >
      {children}
    </button>
  )
}
