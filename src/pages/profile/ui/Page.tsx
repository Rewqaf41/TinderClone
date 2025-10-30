import { useAuthStore } from '@/features/auth'
import { ActionButtons } from '@/features/profile'
import { TinderPlatinumSlider } from '@/features/profile/'
import { VerifiedBadge } from '@/shared/ui'
import { Avatar } from '@/shared/ui/Avatar'

interface ProfilePageProps {}

export function ProfilePage({}: ProfilePageProps) {
	const { user } = useAuthStore()

	if (!user) return null

	return (
		<div className='flex h-[calc(100vh-44px)] flex-col overflow-hidden'>
			<div className='bg-background mt-10 flex flex-1 flex-col items-center text-center'>
				<Avatar complete={20} photo={user.photos[0]} />

				<div className='mt-6 flex items-center gap-2 text-[28px] font-medium'>
					{user.name}, {user.age}
					<VerifiedBadge className='text-[#B9BFC8]' />
				</div>

				<ActionButtons
					onSettingsClick={() => console.log('Settings')}
					onEditClick={() => console.log('Edit')}
					onAddMediaClick={() => console.log('Add media')}
					className='-mt-3'
				/>
			</div>

			{/* Нижний блок — слайдер с вогнутой дугой сверху */}
			<div className='before:bg-background relative flex flex-1 items-center justify-center bg-black text-white'>
				<div className='z-10 w-full max-w-md'>
					<TinderPlatinumSlider />
				</div>
			</div>
		</div>
	)
}
