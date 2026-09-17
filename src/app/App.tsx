import { useEffect, useRef, useState } from 'react'
import { BrowserRouter, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Check, X } from 'lucide-react'
import { initialState } from '@/features/dating/model/data'
import { useDemo } from '@/features/dating/model/useDemo'
import { Discover } from '@/features/dating/ui/Discover'
import { ProfileHome, ProfileEditor } from '@/features/dating/ui/ProfileScreens'
import {
	Chat,
	Explore,
	Inbox,
	LikesScreen,
	Onboarding,
	Preferences,
	SettingsScreen,
	Welcome
} from '@/features/dating/ui/ReferenceScreens'
import { FireIcon, SearchIcon, MatchIcon, ChatIcon, ProfileIcon } from '@/widgets/TabBar/ui/icons'
const links = [
	{ path: '/swipe', label: 'Discovery', icon: FireIcon },
	{ path: '/explore', label: 'Explore', icon: SearchIcon },
	{ path: '/likes', label: 'Likes', icon: MatchIcon },
	{ path: '/messages', label: 'Messages', icon: ChatIcon },
	{ path: '/profile', label: 'Profile', icon: ProfileIcon }
]
function DatingApp() {
	const { state, setState, storageError } = useDemo()
	const navigate = useNavigate()
	const location = useLocation()
	const [filters, setFilters] = useState(false)
	const [toast, setToast] = useState('')
	const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
	const path = location.pathname === '/' ? (state.onboarded ? '/swipe' : '/welcome') : location.pathname
	const params = new URLSearchParams(location.search)
	const activeChat = params.get('chat')
	const fullscreen =
		['/welcome', '/registration', '/profile/edit', '/settings'].includes(path) || (path === '/messages' && !!activeChat)
	function notify(text: string) {
		setToast(text)
		if (timer.current) clearTimeout(timer.current)
		timer.current = setTimeout(() => setToast(''), 3500)
	}
	useEffect(
		() => () => {
			if (timer.current) clearTimeout(timer.current)
		},
		[]
	)
	const props = { state, setState, toast: notify }
	return (
		<div className={`app-shell ${fullscreen ? 'fullscreen' : ''}`}>
			<a className='skip-link' href='#main-content'>
				Skip to content
			</a>
			<main id='main-content' key={path} className={`reference-main ${fullscreen ? 'no-tabs' : ''}`}>
				{path === '/welcome' ? (
					<Welcome />
				) : path === '/registration' ? (
					<Onboarding {...props} />
				) : path === '/profile/edit' ? (
					<ProfileEditor {...props} />
				) : path === '/profile' ? (
					<ProfileHome {...props} />
				) : path === '/explore' ? (
					<Explore {...props} />
				) : path === '/likes' ? (
					<LikesScreen state={state} />
				) : path === '/messages' ? (
					activeChat ? (
						<Chat key={activeChat} {...props} id={activeChat} />
					) : (
						<Inbox state={state} />
					)
				) : path === '/settings' ? (
					<SettingsScreen
						{...props}
						reset={() => {
							setState(initialState)
							navigate('/welcome')
							notify('Demo reset')
						}}
					/>
				) : (
					<Discover
						key={params.get('vibe') || 'all'}
						state={state}
						setState={setState}
						openChat={id => navigate(`/messages?chat=${id}`)}
						openFilters={() => setFilters(true)}
						vibe={params.get('vibe') || undefined}
					/>
				)}
			</main>
			{!fullscreen && (
				<nav className='mobile-nav' aria-label='Main navigation'>
					{links.map(({ path: to, label, icon: Icon }) => (
						<NavLink to={to} aria-label={label} title={label} key={to} className={() => (path === to ? 'active' : '')}>
							<Icon />
							{to === '/likes' && <span className='tab-badge'>{state.matches.length}</span>}
							{to === '/messages' && state.matches.some(id => !state.messages[id]?.length) && <i />}
						</NavLink>
					))}
				</nav>
			)}
			{filters && <Preferences state={state} setState={setState} onClose={() => setFilters(false)} />}
			{toast && (
				<div role='status' className='toast'>
					<Check size={17} />
					{toast}
					<button aria-label='Dismiss' onClick={() => setToast('')}>
						<X size={16} />
					</button>
				</div>
			)}
			{storageError && (
				<div role='alert' className='storage-warning'>
					Your browser could not save these changes. They last until you reload.
				</div>
			)}
		</div>
	)
}
export default function App() {
	return (
		<BrowserRouter>
			<DatingApp />
		</BrowserRouter>
	)
}
