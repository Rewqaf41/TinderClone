import { useEffect, useRef, useState, type Dispatch, type SetStateAction, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import {
	BadgeCheck,
	Check,
	CheckCheck,
	ChevronLeft,
	ChevronRight,
	Heart,
	ImagePlus,
	MoreHorizontal,
	Music2,
	ShieldCheck,
	Smile,
	X
} from 'lucide-react'
import { people, type DemoState } from '../model/data'
import { POPULAR_TAGS } from '@/shared/constants/constants'
import { Avatar, Empty, Entrance, Modal } from './common'
import { PhotoGrid } from './ProfileScreens'
type Props = { state: DemoState; setState: Dispatch<SetStateAction<DemoState>>; toast: (text: string) => void }
export function Welcome() {
	const navigate = useNavigate()
	const [safe, setSafe] = useState(false)
	return (
		<Entrance className='welcome-screen'>
			<div className='welcome-inner reveal'>
				<h1>Welcome to Tinder</h1>
				<p className='muted'>Please follow these house rules</p>
				<ul className='house-rules'>
					{[
						{ title: 'Be yourself', text: 'Make sure your photos, age and bio are true to who you are.' },
						{ title: 'Stay safe', text: 'Don’t be too quick to give out personal information.' },
						{ title: 'Play it cool', text: 'Respect others and treat them as you would like to be treated.' },
						{ title: 'Be proactive', text: 'Always report bad behaviour.' }
					].map((rule, i) => (
						<li key={rule.title}>
							<Check size={17} />
							<div>
								<strong>{rule.title}</strong>
								<p>
									{rule.text}
									{i === 1 && (
										<>
											{' '}
											<button className='inline-link' onClick={() => setSafe(true)}>
												Date safely
											</button>
											.
										</>
									)}
								</p>
							</div>
						</li>
					))}
				</ul>
				<button className='primary-button full-width' onClick={() => navigate('/registration')}>
					I Agree
				</button>
			</div>
			{safe && (
				<Modal title='Date safely' onClose={() => setSafe(false)}>
					<p className='muted'>
						Meet in a public place, tell someone you trust about your plans, and never send money or private documents
						to a stranger. Leave whenever you feel uncomfortable.
					</p>
					<button className='primary-button full-width' onClick={() => setSafe(false)}>
						Got it
					</button>
				</Modal>
			)}
		</Entrance>
	)
}
export function Onboarding({ state, setState, toast }: Props) {
	const navigate = useNavigate()
	const [step, setStep] = useState(0)
	const [draft, setDraft] = useState(state.profile)
	function next(e?: FormEvent) {
		e?.preventDefault()
		if (step === 0 && (draft.name.trim().length < 2 || draft.age < 18 || draft.age > 99)) return
		if (step < 2) setStep(step + 1)
		else if (draft.photos.length) {
			setState(s => ({ ...s, onboarded: true, profile: { ...draft, name: draft.name.trim(), photo: draft.photos[0] } }))
			navigate('/swipe')
		}
	}
	return (
		<Entrance className='onboarding'>
			<div className='onboarding-progress'>
				<span style={{ width: `${[12, 67, 100][step]}%` }} />
			</div>
			<header className='onboarding-controls'>
				<button
					className='icon-button'
					aria-label={step === 0 ? 'Close registration' : 'Previous step'}
					onClick={() => (step ? setStep(step - 1) : navigate('/welcome'))}
				>
					{step === 0 ? <X /> : <ChevronLeft />}
				</button>
				{step === 1 && (
					<button className='text-button' onClick={() => setStep(2)}>
						Skip
					</button>
				)}
			</header>
			{step === 0 ? (
				<form className='name-step reveal' onSubmit={next}>
					<h1>My first name is</h1>
					<input
						aria-label='First name'
						placeholder='First name'
						autoComplete='given-name'
						minLength={2}
						maxLength={30}
						required
						value={draft.name}
						onChange={e => setDraft(d => ({ ...d, name: e.target.value }))}
					/>
					<p className='muted'>This is how it will appear on Tinder.</p>
					<label className='age-label'>
						Age
						<input
							aria-label='Your age'
							type='number'
							min={18}
							max={99}
							required
							value={draft.age}
							onChange={e => setDraft(d => ({ ...d, age: Number(e.target.value) }))}
						/>
					</label>
					<button className='primary-button full-width' disabled={draft.name.trim().length < 2}>
						Continue
					</button>
				</form>
			) : step === 1 ? (
				<>
					<div className='step-heading'>
						<h1>Passions</h1>
						<p className='muted'>
							Let everyone know what you’re passionate
							<br />
							about, by adding it to your profile.
						</p>
					</div>
					<div className='passions-scroll'>
						<div className='pills'>
							{POPULAR_TAGS.map(tag => (
								<button
									key={tag}
									aria-pressed={draft.tags.includes(tag)}
									className={draft.tags.includes(tag) ? 'selected' : ''}
									onClick={() =>
										setDraft(d => ({
											...d,
											tags: d.tags.includes(tag)
												? d.tags.filter(t => t !== tag)
												: d.tags.length < 5
													? [...d.tags, tag]
													: d.tags
										}))
									}
								>
									{tag}
								</button>
							))}
						</div>
					</div>
					<div className='step-footer'>
						<button className='primary-button full-width' onClick={() => next()}>
							Continue ({draft.tags.length}/5)
						</button>
					</div>
				</>
			) : (
				<>
					<div className='step-heading'>
						<h1>Add your photos</h1>
						<p className='muted'>Show the real you. Add at least one photo to start.</p>
					</div>
					<div className='onboarding-photos'>
						<PhotoGrid photos={draft.photos} toast={toast} onChange={photos => setDraft(d => ({ ...d, photos }))} />
					</div>
					<div className='step-footer'>
						<button className='primary-button full-width' disabled={!draft.photos.length} onClick={() => next()}>
							Start matching
						</button>
					</div>
				</>
			)}
		</Entrance>
	)
}
export function Explore({ state, setState }: Props) {
	const navigate = useNavigate()
	const [verify, setVerify] = useState(false)
	return (
		<Entrance className='explore-screen'>
			<button className='verification-banner reveal' onClick={() => setVerify(true)}>
				<img src='/images/me.jpg' alt='Photo verification preview' />
				<span className='verification-frame'>
					<BadgeCheck size={30} fill='#1e9bf0' />
				</span>
				<h1>Get photo verified</h1>
				<div>
					<span>
						<strong>Get verified on Tinder</strong>
						<small>Photo verified</small>
					</span>
					<b>{state.profile.verified ? 'VERIFIED' : 'TRY NOW'}</b>
				</div>
			</button>
			<div className='explore-heading reveal'>
				<h2>Welcome to Explore</h2>
				<p>My vibe …</p>
			</div>
			<div className='explore-grid'>
				{[
					{ id: 'love', title: 'Looking for love', image: 'sofia' },
					{ id: 'tonight', title: 'Free tonight', image: 'kate' },
					{ id: 'friends', title: 'Let’s be friends', image: 'alisa' },
					{ id: 'coffee', title: 'Coffee date', image: 'coffee' }
				].map(item => (
					<button
						key={item.id}
						className={`explore-tile ${item.id} reveal`}
						onClick={() => navigate(`/swipe?vibe=${item.id}`)}
					>
						<img src={`/images/${item.image}.jpg`} alt='' />
						<span />
						<h3>{item.title}</h3>
					</button>
				))}
			</div>
			{verify && (
				<Modal title='Photo verification' onClose={() => setVerify(false)}>
					<ShieldCheck size={36} className='blue-icon' />
					<p className='muted'>In the full app, a video selfie helps confirm that your photos are really you.</p>
					<p className='demo-note'>
						This portfolio demo only previews the verified badge. No identity check or camera recording takes place.
					</p>
					<button
						className='primary-button full-width'
						onClick={() => {
							setState(s => ({ ...s, profile: { ...s.profile, verified: true } }))
							setVerify(false)
						}}
					>
						Preview verified badge
					</button>
				</Modal>
			)}
		</Entrance>
	)
}
export function Inbox({ state }: { state: DemoState }) {
	const navigate = useNavigate()
	const matches = people.filter(p => state.matches.includes(p.id))
	return (
		<Entrance className='inbox-screen'>
			<h1 className='section-title reveal'>New matches</h1>
			<div className='new-matches reveal'>
				<button className='likes-stack' onClick={() => navigate('/likes')}>
					<span>
						<Heart size={24} fill='currentColor' />
						<b>{matches.length}+</b>
					</span>
					<strong>{matches.length} likes</strong>
				</button>
				{matches.map(p => (
					<button className='match-thumb' key={p.id} onClick={() => navigate(`/messages?chat=${p.id}`)}>
						<img src={p.photos[0]} alt={p.name} />
						<strong>{p.name}</strong>
					</button>
				))}
			</div>
			<h2 className='section-title reveal'>Messages</h2>
			<div className='message-list'>
				{matches.map(p => (
					<button className='inbox-row reveal' key={p.id} onClick={() => navigate(`/messages?chat=${p.id}`)}>
						<span className='inbox-avatar'>
							<Avatar src={p.photos[0]} name={p.name} />
							<i className={p.online ? 'online' : ''} />
						</span>
						<span>
							<strong>
								{p.name}
								{!state.messages[p.id]?.length && <b>Likes You</b>}
							</strong>
							<small>{state.messages[p.id]?.at(-1)?.text || 'Recently active, match now!'}</small>
						</span>
					</button>
				))}
			</div>
			{!matches.length && (
				<Empty
					title='Your next hello is out there'
					text='Mutual likes will appear here.'
					action='Start swiping'
					onAction={() => navigate('/swipe')}
				/>
			)}
		</Entrance>
	)
}
export function Chat({ state, setState, id }: Props & { id: string }) {
	const navigate = useNavigate()
	const [draft, setDraft] = useState('')
	const [menu, setMenu] = useState(false)
	const [picker, setPicker] = useState<'gif' | 'emoji' | 'music' | null>(null)
	const bottom = useRef<HTMLDivElement>(null)
	const person = people.find(p => p.id === id && state.matches.includes(p.id))
	const messages = state.messages[id] || []
	useEffect(() => {
		bottom.current?.scrollIntoView({ block: 'nearest', behavior: 'instant' })
	}, [id, messages.length])
	function send(e: FormEvent) {
		e.preventDefault()
		if (!draft.trim() || !person) return
		setState(s => ({
			...s,
			messages: {
				...s.messages,
				[id]: [
					...(s.messages[id] || []),
					{
						id: crypto.randomUUID(),
						text: draft.trim(),
						mine: true,
						time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
					}
				]
			}
		}))
		setDraft('')
	}
	if (!person)
		return (
			<Empty
				title='Conversation unavailable'
				text='Choose a mutual match to start a conversation.'
				action='Back to messages'
				onAction={() => navigate('/messages')}
			/>
		)
	return (
		<div className='full-chat'>
			<header className='chat-header'>
				<button className='icon-button back-accent' aria-label='Back to messages' onClick={() => navigate('/messages')}>
					<ChevronLeft size={29} />
				</button>
				<Avatar src={person.photos[0]} name={person.name} />
				<strong>{person.name}</strong>
				<button className='icon-button chat-menu' aria-label='Conversation options' onClick={() => setMenu(true)}>
					<MoreHorizontal size={27} />
				</button>
			</header>
			<div className='chat-body'>
				<p className='match-date'>You matched with {person.name}. Say hello!</p>
				{!messages.length && (
					<button
						className='icebreaker'
						onClick={() => setDraft(`Hey ${person.name}! What does your ideal weekend look like?`)}
					>
						Break the ice with a question ♡
					</button>
				)}
				{messages.map(m => (
					<div className={`chat-message ${m.mine ? 'mine' : ''}`} key={m.id}>
						{!m.mine && <Avatar src={person.photos[0]} name={person.name} />}
						<div className='bubble-wrap'>
							<div className='bubble'>{m.text}</div>
							{m.mine && (
								<span className='sent-status'>
									<CheckCheck size={14} />
									Sent
								</span>
							)}
						</div>
						{!m.mine && (
							<button
								className={`message-heart ${m.liked ? 'liked' : ''}`}
								aria-label={m.liked ? 'Unlike message' : 'Like message'}
								aria-pressed={!!m.liked}
								onClick={() =>
									setState(s => ({
										...s,
										messages: {
											...s.messages,
											[id]: s.messages[id].map(x => (x.id === m.id ? { ...x, liked: !x.liked } : x))
										}
									}))
								}
							>
								<Heart size={18} fill={m.liked ? 'currentColor' : 'none'} />
							</button>
						)}
					</div>
				))}
				<div ref={bottom} />
			</div>
			<form className='chat-composer' onSubmit={send}>
				<input
					aria-label='Message'
					placeholder='Type a message …'
					maxLength={2000}
					value={draft}
					onChange={e => setDraft(e.target.value)}
				/>
				<button disabled={!draft.trim()}>SEND</button>
			</form>
			<div className='chat-tools'>
				<button
					aria-label='Conversation starter'
					onClick={() => setDraft('Hey! What’s something that made you smile today?')}
				>
					<ImagePlus size={24} />
				</button>
				<button aria-label='Choose a GIF' onClick={() => setPicker('gif')}>
					<b>GIF</b>
				</button>
				<button aria-label='Choose an emoji' onClick={() => setPicker('emoji')}>
					<Smile size={25} />
				</button>
				<button aria-label='Share a song' onClick={() => setPicker('music')}>
					<Music2 size={25} />
				</button>
			</div>
			{picker && (
				<Modal
					title={
						picker === 'music' ? 'Share your favourite song' : picker === 'gif' ? 'A little hello' : 'Pick your mood'
					}
					onClose={() => setPicker(null)}
				>
					{picker === 'music' ? (
						<form
							onSubmit={e => {
								e.preventDefault()
								setPicker(null)
							}}
						>
							<p className='muted'>Add a song title or a link to your message.</p>
							<input
								aria-label='Song'
								value={draft}
								onChange={e => setDraft(e.target.value)}
								placeholder='Artist — song'
							/>
							<button className='primary-button full-width'>Add to message</button>
						</form>
					) : (
						<div className='emoji-picker'>
							{(picker === 'gif'
								? ['👋 Hey there!', '🐶 Sending puppy energy', '☕ Coffee?', '💃 Happy dance']
								: ['😊', '👋', '❤️', '☕', '🐶', '✨', '😂', '🎵']
							).map(value => (
								<button
									key={value}
									onClick={() => {
										setDraft(d => d + value)
										setPicker(null)
									}}
								>
									{value}
								</button>
							))}
						</div>
					)}
					{picker === 'gif' && <p className='demo-note'>Text reactions in this demo; GIF service is not connected.</p>}
				</Modal>
			)}
			{menu && (
				<Modal title='Conversation' onClose={() => setMenu(false)}>
					<p className='muted'>Your messages are stored only in this browser. No messages are sent to real people.</p>
					<button
						className='text-button full-width'
						onClick={() => {
							navigate('/messages')
							setMenu(false)
						}}
					>
						Back to messages
					</button>
				</Modal>
			)}
		</div>
	)
}
export function LikesScreen({ state }: { state: DemoState }) {
	const navigate = useNavigate()
	const [tab, setTab] = useState('matches')
	const selected = people.filter(p =>
		tab === 'matches' ? state.matches.includes(p.id) : state.decisions.some(d => d.id === p.id && d.action !== 'pass')
	)
	return (
		<Entrance className='likes-screen'>
			<div className='edit-tabs'>
				<button className={tab === 'matches' ? 'active' : ''} onClick={() => setTab('matches')}>
					Likes you · {state.matches.length}
				</button>
				<button className={tab === 'sent' ? 'active' : ''} onClick={() => setTab('sent')}>
					Sent likes
				</button>
			</div>
			<p className='likes-caption'>A little spark could be the start of something.</p>
			<div className='likes-grid'>
				{selected.map(p => (
					<button
						className='like-tile reveal'
						key={p.id}
						onClick={() => (state.matches.includes(p.id) ? navigate(`/messages?chat=${p.id}`) : navigate('/swipe'))}
					>
						<img src={p.photos[0]} alt={p.name} />
						<span />
						<strong>
							{p.name}, {p.age}
							<BadgeCheck size={17} />
						</strong>
						<Heart size={23} />
					</button>
				))}
			</div>
			{!selected.length && (
				<Empty
					title='Make the first move'
					text='Like someone and find your next connection.'
					action='Start swiping'
					onAction={() => navigate('/swipe')}
				/>
			)}
		</Entrance>
	)
}
export function Preferences({
	state,
	setState,
	onClose
}: {
	state: DemoState
	setState: Props['setState']
	onClose: () => void
}) {
	const [draft, setDraft] = useState(state.filters)
	return (
		<Modal title='Discovery settings' onClose={onClose}>
			<form
				onSubmit={e => {
					e.preventDefault()
					setState(s => ({ ...s, filters: draft }))
					onClose()
				}}
			>
				<div className='form-row'>
					<label>
						Age from
						<input
							type='number'
							min={18}
							max={draft.maxAge}
							value={draft.minAge}
							required
							onChange={e => setDraft(d => ({ ...d, minAge: Number(e.target.value) }))}
						/>
					</label>
					<label>
						Age to
						<input
							type='number'
							min={draft.minAge}
							max={99}
							value={draft.maxAge}
							required
							onChange={e => setDraft(d => ({ ...d, maxAge: Number(e.target.value) }))}
						/>
					</label>
				</div>
				<label>
					Maximum distance: {draft.distance} km
					<input
						type='range'
						min={1}
						max={100}
						value={draft.distance}
						onChange={e => setDraft(d => ({ ...d, distance: Number(e.target.value) }))}
					/>
				</label>
				<label className='settings-row'>
					<span>Recently active only</span>
					<input
						type='checkbox'
						role='switch'
						checked={draft.online}
						onChange={e => setDraft(d => ({ ...d, online: e.target.checked }))}
					/>
				</label>
				<button className='primary-button full-width'>Apply filters</button>
			</form>
		</Modal>
	)
}
export function SettingsScreen({ state, setState, reset }: Props & { reset: () => void }) {
	const navigate = useNavigate()
	const [confirm, setConfirm] = useState(false)
	const [filter, setFilter] = useState(false)
	return (
		<Entrance className='settings-screen'>
			<header className='editor-header'>
				<button className='icon-button' aria-label='Back to profile' onClick={() => navigate('/profile')}>
					<ChevronLeft />
				</button>
				<h1>Settings</h1>
				<span />
			</header>
			<section className='settings-group'>
				<h2>Discovery</h2>
				<button className='settings-row' onClick={() => setFilter(true)}>
					<span>
						Discovery preferences
						<small>
							Age {state.filters.minAge}–{state.filters.maxAge} · {state.filters.distance} km away
						</small>
					</span>
					<ChevronRight size={18} />
				</button>
				<label className='settings-row'>
					<span>In-app notifications</span>
					<input
						type='checkbox'
						role='switch'
						checked={state.notifications}
						onChange={e => setState(s => ({ ...s, notifications: e.target.checked }))}
					/>
				</label>
			</section>
			<section className='settings-group'>
				<h2>About this demo</h2>
				<p className='muted'>
					A frontend portfolio project based on the original Tinder screens. Profiles and matches are fictional.
					Messages, photos and preferences stay in this browser.
				</p>
				<button className='settings-row' onClick={() => navigate('/welcome')}>
					Welcome & house rules
					<ChevronRight size={18} />
				</button>
				<button className='settings-row danger' onClick={() => setConfirm(true)}>
					Reset demo
					<X size={18} />
				</button>
			</section>
			{filter && <Preferences state={state} setState={setState} onClose={() => setFilter(false)} />}
			{confirm && (
				<Modal title='Start fresh?' onClose={() => setConfirm(false)}>
					<p className='muted'>
						This removes your local messages, photos and profile changes and returns to the welcome screen.
					</p>
					<button className='primary-button full-width' onClick={reset}>
						Reset demo
					</button>
					<button className='text-button full-width' onClick={() => setConfirm(false)}>
						Keep my profile
					</button>
				</Modal>
			)}
		</Entrance>
	)
}
