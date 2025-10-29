import { useAuthStore } from '@/features/auth'
import { REGISTRATION_STEPS } from '@/shared/constants/constants'
import { ROUTES } from '@/shared/constants/routes'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { NameStep } from './steps/NameStep'
import { PhotosStep } from './steps/PhotosStep'
import { TagsStep } from './steps/TagsStep'

export function RegistrationPage() {
	const navigate = useNavigate()
	const { registrationStep, isAuthenticated } = useAuthStore()

	useEffect(() => {
		if (isAuthenticated) {
			navigate(ROUTES.SWIPE)
		}
	}, [isAuthenticated, navigate])

	const renderStep = () => {
		switch (registrationStep) {
			case REGISTRATION_STEPS.NAME:
				return <NameStep />
			case REGISTRATION_STEPS.TAGS:
				return <TagsStep />
			case REGISTRATION_STEPS.PHOTOS:
				return <PhotosStep />
			default:
				return <NameStep />
		}
	}

	return (
		<div>
			<div>{renderStep()}</div>
		</div>
	)
}
