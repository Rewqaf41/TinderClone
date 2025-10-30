import { useAuthStore } from '@/features/auth'
import { REGISTRATION_STEPS } from '@/shared/constants/constants'
import { Button, ProgressBar } from '@/shared/ui'
import { useState, type KeyboardEvent } from 'react'
import { useNavigate } from 'react-router-dom'

export function NameStep() {
	const navigate = useNavigate()
	const { registrationData, updateRegistrationData, setRegistrationStep } = useAuthStore()
	const [name, setName] = useState(registrationData.name || '')
	const [error, setError] = useState('')

	const handleNext = () => {
		if (!name.trim()) {
			setError('Пожалуйста, введите ваше имя')
			return
		}
		if (name.trim().length < 2) {
			setError('Имя должно содержать минимум 2 символа')
			return
		}
		updateRegistrationData({ name: name.trim() })
		setRegistrationStep(REGISTRATION_STEPS.TAGS)
	}

	const handleKeyPress = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			handleNext()
		}
	}

	return (
		<>
			<ProgressBar currentStep={1} totalSteps={3} />

			<div className='bg-background text-text-primary flex min-h-screen flex-col px-6 pt-6'>
				<div onClick={() => navigate(-1)} className='mb-3 flex items-center'>
					<svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
						<g clip-path='url(#clip0_1_9837)'>
							<path
								fill-rule='evenodd'
								clip-rule='evenodd'
								d='M0.585786 0.585786C1.36683 -0.195262 2.63317 -0.195262 3.41422 0.585786L12 9.17157L20.5858 0.585787C21.3668 -0.195262 22.6332 -0.195262 23.4142 0.585787C24.1953 1.36684 24.1953 2.63317 23.4142 3.41421L14.8284 12L23.4142 20.5858C24.1953 21.3668 24.1953 22.6332 23.4142 23.4142C22.6332 24.1953 21.3668 24.1953 20.5858 23.4142L12 14.8284L3.41422 23.4142C2.63317 24.1953 1.36683 24.1953 0.585786 23.4142C-0.195262 22.6332 -0.195262 21.3668 0.585786 20.5858L9.17157 12L0.585786 3.41421C-0.195262 2.63317 -0.195262 1.36683 0.585786 0.585786Z'
								fill='#7C8591'
							/>
						</g>
						<defs>
							<clipPath id='clip0_1_9837'>
								<rect width='24' height='24' fill='white' />
							</clipPath>
						</defs>
					</svg>
				</div>

				<h1 className='mb-9 text-[28px] font-bold'>My first name is</h1>

				<input
					type='text'
					placeholder='Your name'
					value={name}
					onChange={e => {
						setName(e.target.value)
						setError('')
					}}
					onKeyPress={handleKeyPress}
					className='border-border mb-[18px] w-full rounded-md border bg-black px-3.5 py-3'
				/>

				{error && <p className='mt-2 text-sm text-red-500'>{error}</p>}

				<p className='text-text-tertiary text-[15px] font-medium'>This is how it will appear in Tinder.</p>

				<Button onClick={handleNext} disabled={!name.trim()} variant='primary' className='text-[19px] text-white'>
					Continue
				</Button>
			</div>
		</>
	)
}
