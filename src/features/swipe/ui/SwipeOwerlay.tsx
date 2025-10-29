import { m } from 'framer-motion'
import { Heart, Star, X } from 'lucide-react'

interface SwipeOverlayProps {
  direction: 'left' | 'right' | 'up' | null
  opacity: number
}

export function SwipeOverlay({ direction, opacity }: SwipeOverlayProps) {
  if (!direction || opacity === 0) return null

  const config = {
    left: {
      icon: X,
      color: 'from-red-500/90 to-pink-500/90',
      text: 'NOPE',
      rotation: -30,
    },
    right: {
      icon: Heart,
      color: 'from-green-400/90 to-emerald-500/90',
      text: 'LIKE',
      rotation: 30,
    },
    up: {
      icon: Star,
      color: 'from-blue-400/90 to-cyan-500/90',
      text: 'SUPER LIKE',
      rotation: 0,
    },
  }

  const { icon: Icon, color, text, rotation } = config[direction]

  return (
    <m.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity }}
    >
      <m.div
        className={`bg-linear-to-br ${color} px-8 py-4 rounded-2xl border-4 border-white shadow-2xl`}
        animate={{ rotate: rotation }}
      >
        <div className="flex items-center gap-3">
          <Icon className="w-8 h-8 text-white" strokeWidth={3} />
          <span className="text-white font-black text-3xl tracking-wider">
            {text}
          </span>
        </div>
      </m.div>
    </m.div>
  )
}
