import type { IProfile } from '@/entities/profile'
import { InfoBadge, Tag, VerifiedBadge } from '@/shared/ui'
import { memo, useCallback } from 'react'

interface ProfileInfoProps {
	profile: IProfile
}

function ProfileInfoComponent({ profile }: ProfileInfoProps) {
	const handleInfoClick = useCallback(() => {
		console.log('Info clicked')
	}, [])

	return (
		<div className='absolute right-0 bottom-0 left-0 space-y-3 p-4'>
			<div className='flex items-center justify-between'>
				<div className='flex items-center gap-2'>
					<h2 className='text-4xl font-bold text-white'>{profile.name}</h2>
					<span className='text-3xl text-white/90'>{profile.age}</span>
					{/* В дальнейшем подключить к api */}
					<VerifiedBadge />
				</div>
				<InfoBadge onClick={handleInfoClick} />
			</div>

			<div className='flex flex-wrap gap-2'>
				{profile.tags.map((tag, i) => (
					<Tag variant='swipe' key={i}>
						{tag}
					</Tag>
				))}
			</div>
		</div>
	)
}

export const ProfileInfo = memo(ProfileInfoComponent)
