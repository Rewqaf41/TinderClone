interface SwitchProps {
	checked: boolean
	onChange: (checked: boolean) => void
}

export function Switch({ checked, onChange }: SwitchProps) {
	return (
		<label className='relative inline-flex cursor-pointer items-center'>
			<input type='checkbox' className='peer sr-only' checked={checked} onChange={e => onChange(e.target.checked)} />
			<div className="peer peer-checked:bg-primary-dark h-6 w-11 rounded-full bg-gray-600 peer-focus:outline-none after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
		</label>
	)
}
