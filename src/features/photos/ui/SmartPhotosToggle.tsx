import { Switch } from '@/shared/ui'

interface SmartPhotosToggleProps {
  smartPhotos: boolean
  setSmartPhotos: (value: boolean) => void
}

export function SmartPhotosToggle({
  smartPhotos,
  setSmartPhotos,
}: SmartPhotosToggleProps) {
  return (
    <div className="flex w-full h-[52px] justify-between items-center bg-background border-border border-y px-4">
      <span className="text-[15px] text-white">Smart Photos</span>
      <Switch checked={smartPhotos} onChange={setSmartPhotos} />
    </div>
  )
}
