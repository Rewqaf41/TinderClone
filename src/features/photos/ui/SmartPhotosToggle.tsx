import { Switch } from '@/shared/ui'

interface SmartPhotosToggleProps {
	smartPhotos: boolean
	setSmartPhotos: (value: boolean) => void
}

export function SmartPhotosToggle({ smartPhotos, setSmartPhotos }: SmartPhotosToggleProps) {
	return (
		<div className='bg-background border-border flex h-[52px] w-full items-center justify-between border-y px-4'>
			<span className='text-[15px] text-white'>Smart Photos</span>
			<Switch checked={smartPhotos} onChange={setSmartPhotos} />
		</div>
	)
}
