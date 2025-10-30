import { NavLink } from 'react-router-dom'
import { TABS } from '../model/Tabs.data'

export function TabBar() {
	return (
		<nav className='bg-background fixed bottom-0 left-1/2 z-50 flex h-12 w-full max-w-(--max-mobile-width) -translate-x-1/2 justify-around py-2 shadow-md'>
			{TABS.map(tab => {
				const Icon = tab.Icon
				return (
					<NavLink
						key={tab.route}
						to={tab.route}
						className={({ isActive }) =>
							`flex flex-col items-center text-sm transition-colors ${isActive ? 'text-primary-dark' : 'text-gray-500'}`
						}
					>
						<Icon className='mb-1 h-6 w-6' />
					</NavLink>
				)
			})}
		</nav>
	)
}
