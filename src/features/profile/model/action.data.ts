export interface ProfileAction {
  id: string
  label: string
  icon: 'settings' | 'edit' | 'camera'
  variant: 'default' | 'primary'
  onClick?: () => void
}

export const PROFILE_ACTIONS: ProfileAction[] = [
  {
    id: 'settings',
    label: 'Settings',
    icon: 'settings',
    variant: 'default',
  },
  {
    id: 'edit',
    label: 'Edit profile',
    icon: 'edit',
    variant: 'default',
  },
  {
    id: 'media',
    label: 'Add media',
    icon: 'camera',
    variant: 'primary',
  },
]