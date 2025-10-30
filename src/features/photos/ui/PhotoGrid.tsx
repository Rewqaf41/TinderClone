import { Badge } from '@/shared/ui'
import type { ChangeEvent, DragEvent } from 'react'

interface PhotoGridProps {
	photos: string[]
	maxPhotos: number
	isDragging: boolean
	setIsDragging: (isDragging: boolean) => void
	handleFileSelect: (e: ChangeEvent<HTMLInputElement>) => void
	handleRemovePhoto: (index: number) => void
	handleDrop: (e: DragEvent) => void
}

export function PhotoGrid({
	photos,
	maxPhotos,
	isDragging,
	setIsDragging,
	handleFileSelect,
	handleRemovePhoto,
	handleDrop
}: PhotoGridProps) {
	return (
		<div className='grid w-full max-w-[396px] grid-cols-3 gap-4 px-2'>
			{Array.from({ length: maxPhotos }).map((_, index) => {
				const photo = photos[index]
				return (
					<div key={index} className='relative aspect-3/4 rounded-2xl bg-[#1C1F26]'>
						{photo ? (
							<div className='absolute inset-0 overflow-hidden rounded-2xl'>
								<img src={photo} alt={`Photo ${index + 1}`} className='h-full w-full object-cover' />
							</div>
						) : null}
						{photo ? (
							<button className='absolute -right-1 bottom-0 z-10' onClick={() => handleRemovePhoto(index)}>
								<Badge variant='light'>
									<svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
										<path
											d='M10.2933 8.00001L13.472 11.1387C14.176 11.79 14.176 12.766 13.472 13.4713C12.93 14.176 11.8467 14.176 11.1967 13.4713L8 10.3467L4.858 13.4167C4.208 14.122 3.23267 14.122 2.528 13.4167C1.824 12.8747 1.824 11.79 2.528 11.1387L5.64667 8.00001L2.58267 4.84735C1.824 4.19668 1.824 3.22068 2.58267 2.56935C2.70358 2.39376 2.86536 2.25019 3.05408 2.151C3.2428 2.05182 3.4528 2 3.666 2C3.8792 2 4.0892 2.05182 4.27792 2.151C4.46664 2.25019 4.62842 2.39376 4.74933 2.56935L8 5.61401L11.142 2.56935C11.792 1.81001 12.7673 1.81001 13.4173 2.56935C14.122 3.11201 14.122 4.19601 13.4173 4.84735L10.2933 8.00001Z'
											fill='#7C8591'
										/>
									</svg>
								</Badge>
							</button>
						) : (
							<label
								className={`border-border absolute inset-0 flex cursor-pointer items-center justify-center rounded-2xl border-3 border-dashed ${isDragging ? 'border-primary-dark' : ''}`}
								onDragOver={e => {
									e.preventDefault()
									setIsDragging(true)
								}}
								onDragLeave={() => setIsDragging(false)}
								onDrop={handleDrop}
							>
								<input type='file' accept='image/*' multiple onChange={handleFileSelect} className='hidden' />
								<Badge className='absolute -right-1 bottom-0 z-10'>
									<svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
										<path
											d='M8 0C7.2636 0 6.66667 0.596953 6.66667 1.33333V6.66667H1.33333C0.596954 6.66667 0 7.2636 0 8C0 8.7364 0.596954 9.33333 1.33333 9.33333H6.66667V14.6667C6.66667 15.4031 7.2636 16 8 16C8.7364 16 9.33333 15.4031 9.33333 14.6667V9.33333H14.6667C15.4031 9.33333 16 8.7364 16 8C16 7.2636 15.4031 6.66667 14.6667 6.66667H9.33333V1.33333C9.33333 0.596954 8.7364 0 8 0Z'
											fill='white'
										/>
									</svg>
								</Badge>
							</label>
						)}
					</div>
				)
			})}
		</div>
	)
}
