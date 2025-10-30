import { useAuthStore } from '@/features/auth'
import { PhotoGrid, PreviewCard, SmartPhotosToggle } from '@/features/photos/'
import { MAX_PHOTOS } from '@/shared/constants/constants'
import { ROUTES } from '@/shared/constants/routes'
import { Button } from '@/shared/ui'
import { useState, type ChangeEvent, type DragEvent } from 'react'
import { useNavigate } from 'react-router-dom'

export const PhotosStep = () => {
	const navigate = useNavigate()
	const { registrationData, completeRegistration } = useAuthStore()
	const [photos, setPhotos] = useState<string[]>(registrationData.photos || [])
	const [isDragging, setIsDragging] = useState(false)
	const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit')
	const [smartPhotos, setSmartPhotos] = useState(false)

	const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files || [])
		handleFiles(files)
	}

	const handleFiles = (files: File[]) => {
		const remainingSlots = MAX_PHOTOS - photos.length
		const filesToProcess = files.slice(0, remainingSlots)

		filesToProcess.forEach(file => {
			if (file.type.startsWith('image/')) {
				const reader = new FileReader()
				reader.onload = e => {
					const result = e.target?.result as string
					setPhotos(prev => [...prev, result])
				}
				reader.readAsDataURL(file)
			}
		})
	}

	const handleRemovePhoto = (index: number) => {
		setPhotos(photos.filter((_, i) => i !== index))
	}

	const handleDrop = (e: DragEvent) => {
		e.preventDefault()
		setIsDragging(false)
		const files = Array.from(e.dataTransfer.files)
		handleFiles(files)
	}

	const handleComplete = () => {
		completeRegistration({
			name: registrationData.name!,
			tags: registrationData.tags!,
			photos
		})
		navigate(ROUTES.SWIPE)
	}

	return (
		<div className='text-text-primary flex h-screen flex-col bg-black'>
			<div className='bg-background flex border-b border-gray-700 pt-10'>
				<button
					className={`border-border flex-1 border-r py-4 text-[19px] font-bold ${activeTab === 'edit' ? 'text-primary-dark' : 'text-gray-400'}`}
					onClick={() => setActiveTab('edit')}
				>
					Edit
				</button>
				<button
					className={`flex-1 py-4 text-[19px] font-bold ${activeTab === 'preview' ? 'text-primary-dark' : 'text-gray-400'}`}
					onClick={() => setActiveTab('preview')}
				>
					Preview
				</button>
			</div>

			{activeTab === 'edit' ? (
				<div className='flex flex-1 flex-col justify-around gap-2 overflow-y-auto bg-black pt-4 pb-4'>
					<div className='flex justify-center'>
						<PhotoGrid
							photos={photos}
							maxPhotos={MAX_PHOTOS}
							isDragging={isDragging}
							setIsDragging={setIsDragging}
							handleFileSelect={handleFileSelect}
							handleRemovePhoto={handleRemovePhoto}
							handleDrop={handleDrop}
						/>
					</div>
					<p className='px-4 text-sm text-gray-400'>
						Add a video, pic or Loop to get 4% closer to completing your profile and you may even get more Likes.
					</p>
					<div className='px-4'>
						<SmartPhotosToggle smartPhotos={smartPhotos} setSmartPhotos={setSmartPhotos} />
						{/* Я помню то что в тз perfect pixel дизайн, но в дизайне 0 комментариев так что не понятно как должна завершаться регистрация на этом шаге  */}
						<Button onClick={handleComplete} className='mt-4' fullWidth variant='primary'>
							Finish registration
						</Button>
					</div>
				</div>
			) : (
				<PreviewCard photos={photos} />
			)}
		</div>
	)
}
