import { PROFILE_ACTIONS } from '../model/action.data'
import { ActionButton } from './ActionButton'

interface ActionButtonsProps {
	onSettingsClick?: () => void
	onEditClick?: () => void
	onAddMediaClick?: () => void
	className?: string
}

export const ActionButtons = ({ onSettingsClick, onEditClick, onAddMediaClick, className }: ActionButtonsProps) => {
	const handleClick = (id: string) => {
		switch (id) {
			case 'settings':
				onSettingsClick?.()
				break
			case 'edit':
				onEditClick?.()
				break
			case 'media':
				onAddMediaClick?.()
				break
		}
	}

	return (
		<div className={`flex items-center justify-center gap-12 px-6 py-8 ${className}`}>
			{PROFILE_ACTIONS.map(action => (
				<ActionButton key={action.id} {...action} onClick={() => handleClick(action.id)} />
			))}
		</div>
	)
}
