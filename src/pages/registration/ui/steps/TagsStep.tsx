import { useAuthStore } from '@/features/auth'
import { MAX_TAGS, POPULAR_TAGS, REGISTRATION_STEPS } from '@/shared/constants/constants'
import { Button, ProgressBar } from '@/shared/ui'
import { useState } from 'react'

export const TagsStep = () => {
	const { registrationData, updateRegistrationData, setRegistrationStep } = useAuthStore()

	const [selectedTags, setSelectedTags] = useState<string[]>(registrationData.tags || [])

	const handleTagToggle = (tag: string) => {
		if (selectedTags.includes(tag)) {
			setSelectedTags(selectedTags.filter(t => t !== tag))
		} else if (selectedTags.length < MAX_TAGS) {
			setSelectedTags([...selectedTags, tag])
		}
	}

	const handleNext = () => {
		updateRegistrationData({ tags: selectedTags })
		setRegistrationStep(REGISTRATION_STEPS.PHOTOS)
	}

	const handleBack = () => {
		setRegistrationStep(REGISTRATION_STEPS.NAME)
	}

	const handleSkip = () => {
		// Сохраняем пустой список тегов и переходим к следующему шагу
		updateRegistrationData({ tags: [] })
		setRegistrationStep(REGISTRATION_STEPS.PHOTOS)
	}

	return (
		<div className='relative flex min-h-screen flex-col bg-[#0E0E10] text-white'>
			<ProgressBar currentStep={2} totalSteps={3} />

			<div className='border-border fixed top-0 left-0 z-20 w-full border-b bg-[#0E0E10] px-6 pt-6 pb-4'>
				<div className='mb-4 flex items-center justify-between'>
					<button onClick={handleBack}>
						<svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
							<path
								d='M13.9799 20.717C14.1479 20.9075 14.3545 21.06 14.586 21.1645C14.8174 21.269 15.0685 21.323 15.3224 21.323C15.5764 21.323 15.8275 21.269 16.0589 21.1645C16.2904 21.06 16.497 20.9075 16.6649 20.717C16.8552 20.549 17.0076 20.3425 17.112 20.1111C17.2164 19.8798 17.2704 19.6288 17.2704 19.375C17.2704 19.1212 17.2164 18.8703 17.112 18.6389C17.0076 18.4075 16.8552 18.201 16.6649 18.033L9.50695 11.413L16.6649 4.61301C16.8552 4.44503 17.0076 4.23851 17.112 4.00714C17.2164 3.77576 17.2704 3.52484 17.2704 3.27101C17.2704 3.01718 17.2164 2.76625 17.112 2.53488C17.0076 2.30351 16.8552 2.09698 16.6649 1.92901C16.497 1.73871 16.2904 1.5863 16.0591 1.48192C15.8277 1.37753 15.5768 1.32355 15.3229 1.32355C15.0691 1.32355 14.8182 1.37753 14.5868 1.48192C14.3554 1.5863 14.1489 1.73871 13.9809 1.92901L5.92895 9.98001C5.73864 10.148 5.58624 10.3545 5.48186 10.5859C5.37747 10.8172 5.32349 11.0682 5.32349 11.322C5.32349 11.5758 5.37747 11.8268 5.48186 12.0581C5.58624 12.2895 5.73864 12.496 5.92895 12.664L13.9809 20.716L13.9799 20.717Z'
								fill='#E5E5E7'
							/>
						</svg>
					</button>
					<button onClick={handleSkip} className='text-[15px] font-bold text-[#A6A7AA]'>
						Skip
					</button>
				</div>

				<h1 className='mb-1 text-[28px] leading-tight font-bold'>Passions</h1>
				<p className='text-[17px] leading-relaxed text-[#A6A7AA]'>
					Let everyone know what you’re passionate about, by adding it to your profile.
				</p>
			</div>

			<div className='flex-1 overflow-y-auto px-6 pt-[210px] pb-32'>
				<div className='flex flex-wrap justify-center gap-2'>
					{POPULAR_TAGS.map(tag => (
						<button
							key={tag}
							onClick={() => handleTagToggle(tag)}
							className={`rounded-full border px-4 py-1.5 text-[14px] font-medium transition-all ${
								selectedTags.includes(tag)
									? 'border-transparent bg-linear-to-r from-[#FE3C72] to-[#FF655B] text-white'
									: 'border-[#2A2A2D] bg-[#1A1A1C] text-[#E5E5E7]'
							}`}
						>
							{tag}
						</button>
					))}
				</div>
			</div>

			<div className='border-border fixed bottom-0 left-0 w-full border-t bg-[#0E0E10] px-5 pt-4 pb-6'>
				<Button
					variant='primary'
					onClick={handleNext}
					disabled={selectedTags.length === 0}
					className='w-full rounded-full py-3.5 text-[16px] font-bold transition-all disabled:bg-gray-300'
				>
					Continue ({selectedTags.length}/{MAX_TAGS})
				</Button>
			</div>
		</div>
	)
}
