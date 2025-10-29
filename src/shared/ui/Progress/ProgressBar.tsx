interface ProgressBarProps {
  currentStep: number
  totalSteps: number
}

export const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
  const progress = (currentStep / totalSteps) * 100

  return (
    <div className="fixed top-0 left-0 right-0 h-2.5 bg-gray-900 z-50">
      <div
        className="h-full bg-linear-to-r from-orange-500 via-pink-500 to-pink-600 transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
