import type { IProfile } from '@/entities/profile'
import { Tag } from 'lucide-react'

export function ProfileInfo({ profile }: { profile: IProfile }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <h2 className="text-4xl font-bold text-white">{profile.name}</h2>
        <span className="text-3xl text-white/90">{profile.age}</span>
        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
          <svg
            className="w-4 h-4 text-white"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
          </svg>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {profile.tags.map((tag, i) => (
          <Tag key={i}>{tag}</Tag>
        ))}
      </div>
    </div>
  )
}
