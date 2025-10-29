import { m } from 'framer-motion'

interface PhotoProgressProps {
  total: number
  current: number
}

export function PhotoProgress({ total, current }: PhotoProgressProps) {
  return (
    <div className="flex gap-1 px-2">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden"
        >
          <m.div
            className="h-full bg-white rounded-full"
            initial={{ width: 0 }}
            animate={{
              width: i < current ? '100%' : i === current ? '100%' : 0,
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      ))}
    </div>
  )
}
