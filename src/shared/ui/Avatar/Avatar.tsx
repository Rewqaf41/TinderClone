import styles from './Avatar.module.css'

interface AvatarProps {
	photo: string
	complete: number
}

export function Avatar({ photo, complete }: AvatarProps) {
	return (
		<div className='relative'>
			<div className={`${styles.avatarBorder} relative rotate-3 p-2`}>
				<img className='relative h-[140px] w-[140px] rounded-full object-cover object-top' src={photo} alt='avatar' />
			</div>
			<div className='absolute right-2.5 -bottom-1'>
				<div className='from-primary to-secondary rounded-full bg-linear-to-r px-6 py-2 text-sm font-semibold shadow-md'>
					{complete}% complete
				</div>
			</div>
		</div>
	)
}
