interface ProgressBarProps {
	currentStep: number
	totalSteps: number
}

export const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
	const progress = (currentStep / totalSteps) * 100

	return (
		<div className='fixed top-0 left-1/2 z-50 h-2.5 w-full max-w-(--max-mobile-width) -translate-x-1/2 bg-gray-900'>
			<div
				className='h-full bg-linear-to-r from-orange-500 via-pink-500 to-pink-600 transition-all duration-300 ease-out'
				style={{ width: `${progress}%` }}
			/>
		</div>
	)
}
