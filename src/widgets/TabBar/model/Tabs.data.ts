import { ROUTES } from '@/shared/constants/routes'
import type { FC, SVGProps } from 'react'
import { ChatIcon, FireIcon, MatchIcon, ProfileIcon, SearchIcon } from '../ui/icons'

interface ITab {
	route: string;
	Icon: FC<SVGProps<SVGSVGElement>>
}

export const TABS: ITab[] = [
  { route: ROUTES.SWIPE, Icon: FireIcon},
  { route: ROUTES.SEARCH, Icon: SearchIcon },
  { route: ROUTES.MATCHES, Icon: MatchIcon },
  { route: ROUTES.MESSAGES, Icon: ChatIcon },
  { route: ROUTES.PROFILE, Icon: ProfileIcon },
]