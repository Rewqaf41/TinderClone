import { useAuthStore } from '@/features/auth'
import { ActionButtons, MoreAboutMeModal } from '@/features/profile'
import { TinderPlatinumSlider } from '@/features/profile/'
import { VerifiedBadge } from '@/shared/ui'
import { Avatar } from '@/shared/ui/Avatar'
import { useState } from 'react'

export function ProfilePage() {
	const { user } = useAuthStore()
	const [modalOpen, setModalOpen] = useState(false)

	if (!user) return null

	return (
		<div className='bg-background relative mx-auto flex h-[calc(100vh-48px)] w-full max-w-(--max-mobile-width) flex-col overflow-hidden text-white'>
			<div className='mt-10 flex flex-1 flex-col items-center text-center'>
				<Avatar complete={20} photo={user.photos[0]} />
				<div className='mt-6 flex items-center gap-2 text-[28px] font-medium'>
					{user.name}, {user.age}
					<VerifiedBadge className='text-[#B9BFC8]' />
				</div>
				<ActionButtons
					onSettingsClick={() => console.log('Settings')}
					onEditClick={() => setModalOpen(true)}
					onAddMediaClick={() => console.log('Add media')}
					className='-mt-3'
				/>
			</div>

			<div className='before:bg-background relative flex flex-1 items-center justify-center bg-black'>
				<div className='z-10 w-full max-w-md'>
					<TinderPlatinumSlider />
				</div>
			</div>

			<MoreAboutMeModal open={modalOpen} onClose={() => setModalOpen(false)} />
		</div>
	)
}
