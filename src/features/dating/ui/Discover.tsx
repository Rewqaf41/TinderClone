import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from 'react'
import { animate, type JSAnimation } from 'animejs'
import { BadgeCheck, Heart, Info, MapPin, RotateCcw, SlidersHorizontal, Star, X, Zap } from 'lucide-react'
import { people, type DemoState, type Person } from '../model/data'
import { Avatar, Empty, Modal } from './common'
interface Props {
	state: DemoState
	setState: Dispatch<SetStateAction<DemoState>>
	openChat: (id: string) => void
	openFilters: () => void
	vibe?: string
}
export function Discover({ state, setState, openChat, openFilters, vibe }: Props) {
	const [details, setDetails] = useState(false)
	const [boost, setBoost] = useState(false)
	const [photo, setPhoto] = useState(0)
	const [match, setMatch] = useState<Person | null>(null)
	const [busy, setBusy] = useState(false)
	const [feedback, setFeedback] = useState<'like' | 'pass' | 'super' | null>(null)
	const card = useRef<HTMLDivElement>(null)
	const animation = useRef<JSAnimation | null>(null)
	const drag = useRef<number | null>(null)
	const photoTap = useRef(false)
	const lock = useRef(false)
	const available = people.filter(
		p =>
			!state.decisions.some(d => d.id === p.id) &&
			p.age >= state.filters.minAge &&
			p.age <= state.filters.maxAge &&
			p.distance <= state.filters.distance &&
			(!state.filters.online || p.online) &&
			(!vibe ||
				vibe === 'love' ||
				vibe === 'friends' ||
				(vibe === 'tonight' ? p.online : p.tags.some(t => ['Кофе', 'Coffee', 'Café hopping'].includes(t))))
	)
	const person = available[0]
	useEffect(
		() => () => {
			animation.current?.revert()
		},
		[]
	)
	function decide(action: 'like' | 'pass' | 'super') {
		if (!person || lock.current) return
		lock.current = true
		setBusy(true)
		setFeedback(action)
		const complete = () => {
			const isMatch =
				action !== 'pass' && ['anna', 'alisa', 'kate'].includes(person.id) && !state.matches.includes(person.id)
			setState(s => ({
				...s,
				decisions: [...s.decisions, { id: person.id, action }],
				matches: isMatch ? [...s.matches, person.id] : s.matches
			}))
			if (isMatch) setMatch(person)
			setPhoto(0)
			setFeedback(null)
			setBusy(false)
			lock.current = false
		}
		if (!card.current) return complete()
		animation.current = animate(card.current, {
			x: action === 'pass' ? -420 : action === 'super' ? 0 : 420,
			y: action === 'super' ? -500 : 25,
			rotate: action === 'pass' ? -16 : action === 'super' ? 0 : 16,
			opacity: 0,
			duration: matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 360,
			ease: 'in(2)',
			onComplete: complete
		})
	}
	function rewind() {
		if (busy || !state.decisions.length) return
		setPhoto(0)
		setState(s => ({ ...s, decisions: s.decisions.slice(0, -1) }))
	}
	useEffect(() => {
		function onKey(e: KeyboardEvent) {
			if (
				document.querySelector('dialog[open]') ||
				(e.target instanceof HTMLElement && ['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON'].includes(e.target.tagName))
			)
				return
			if (e.key === 'ArrowLeft') {
				e.preventDefault()
				decide('pass')
			}
			if (e.key === 'ArrowRight') {
				e.preventDefault()
				decide('like')
			}
		}
		window.addEventListener('keydown', onKey)
		return () => window.removeEventListener('keydown', onKey)
	})
	return (
		<div className='swipe-screen'>
			<div className='swipe-top'>
				<span>
					{vibe
						? { love: 'Looking for love', tonight: 'Free tonight', friends: 'Let’s be friends', coffee: 'Coffee date' }[
								vibe
							] || ''
						: ''}
				</span>
				<button className='icon-button' aria-label='Discovery settings' onClick={openFilters}>
					<SlidersHorizontal size={19} />
				</button>
			</div>
			{person ? (
				<div className='swipe-stage'>
					<div
						key={person.id}
						ref={card}
						className='dating-card'
						onPointerDown={e => {
							const target = e.target as HTMLElement
							photoTap.current = !!target.closest('.photo-taps')
							if (busy || (target.closest('button') && !photoTap.current)) return
							drag.current = e.clientX
							e.currentTarget.setPointerCapture(e.pointerId)
						}}
						onPointerMove={e => {
							if (drag.current === null || busy) return
							const dx = e.clientX - drag.current
							e.currentTarget.style.transform = `translateX(${dx * 0.55}px) rotate(${dx * 0.035}deg)`
						}}
						onPointerUp={e => {
							if (drag.current === null) return
							const dx = e.clientX - drag.current
							drag.current = null
							if (Math.abs(dx) > 75) decide(dx > 0 ? 'like' : 'pass')
							else {
								animation.current = animate(e.currentTarget, { x: 0, rotate: 0, duration: 250, ease: 'out(3)' })
								if (Math.abs(dx) < 8 && photoTap.current) {
									const bounds = e.currentTarget.getBoundingClientRect()
									const direction = e.clientX < bounds.left + bounds.width / 2 ? -1 : 1
									setPhoto(i => (i + direction + person.photos.length) % person.photos.length)
								}
							}
						}}
						onPointerCancel={() => {
							drag.current = null
							if (card.current) animation.current = animate(card.current, { x: 0, rotate: 0, duration: 200 })
						}}
					>
						<img
							className='profile-photo'
							src={person.photos[photo]}
							alt={`${person.name}, photo ${photo + 1}`}
							draggable={false}
							onError={e => {
								e.currentTarget.onerror = null
								e.currentTarget.src = '/images/fallback.svg'
							}}
						/>
						<div className='card-shade' />
						<div className='photo-indicators'>
							{person.photos.map((_, i) => (
								<button
									key={i}
									aria-label={`Photo ${i + 1}`}
									aria-current={photo === i}
									className={photo === i ? 'active' : ''}
									onClick={() => setPhoto(i)}
								/>
							))}
						</div>
						<div className='photo-taps'>
							<button
								aria-label='Previous photo'
								onClick={e => {
									if (e.detail === 0) setPhoto(i => (i - 1 + person.photos.length) % person.photos.length)
								}}
							/>
							<button
								aria-label='Next photo'
								onClick={e => {
									if (e.detail === 0) setPhoto(i => (i + 1) % person.photos.length)
								}}
							/>
						</div>
						{feedback && (
							<div className={`swipe-stamp ${feedback}`}>
								{feedback === 'pass' ? 'NOPE' : feedback === 'super' ? 'SUPER LIKE' : 'LIKE'}
							</div>
						)}
						<div className='card-info'>
							<div className='card-name'>
								<h1>
									{person.name} <span>{person.age}</span>
								</h1>
								<BadgeCheck size={21} fill='#179af9' color='white' />
								<button aria-label='About this person' onClick={() => setDetails(true)}>
									<Info size={23} fill='white' color='#111418' />
								</button>
							</div>
							<div className='card-tags'>
								{person.tags.map(t => (
									<span key={t}>{t}</span>
								))}
							</div>
						</div>
					</div>
					<div className='swipe-actions'>
						<button
							className='action-circle rewind'
							disabled={busy || !state.decisions.length}
							aria-label='Rewind'
							onClick={rewind}
						>
							<RotateCcw size={25} />
						</button>
						<button className='action-circle pass' disabled={busy} aria-label='Pass' onClick={() => decide('pass')}>
							<X size={34} strokeWidth={2.5} />
						</button>
						<button
							className='action-circle super'
							disabled={busy}
							aria-label='Super like'
							onClick={() => decide('super')}
						>
							<Star size={28} fill='currentColor' />
						</button>
						<button className='action-circle like' disabled={busy} aria-label='Like' onClick={() => decide('like')}>
							<Heart size={29} fill='currentColor' />
						</button>
						<button className='action-circle boost' aria-label='Boost' onClick={() => setBoost(true)}>
							<Zap size={25} fill='currentColor' />
						</button>
					</div>
				</div>
			) : (
				<Empty
					title='You’re all caught up'
					text='Try changing your discovery settings or take another look.'
					action='Start again'
					onAction={() => {
						setPhoto(0)
						setState(s => ({ ...s, decisions: [], filters: { minAge: 18, maxAge: 35, distance: 25, online: false } }))
					}}
				/>
			)}
			{details && person && (
				<Modal title={`${person.name}, ${person.age}`} onClose={() => setDetails(false)} className='bottom-sheet'>
					<p className='muted'>
						<MapPin size={15} /> {person.distance} km away · {person.job}
					</p>
					<p className='person-bio'>{person.bio}</p>
					<div className='pills'>
						{person.tags.map(t => (
							<span key={t}>{t}</span>
						))}
					</div>
					<section className='about-section'>
						<h3>{person.prompt}</h3>
						<p className='muted'>{person.answer}</p>
					</section>
					<button className='primary-button full-width' onClick={() => setDetails(false)}>
						Back to discovery
					</button>
				</Modal>
			)}
			{boost && (
				<Modal title='Be seen with Boost' onClose={() => setBoost(false)}>
					<Zap size={40} color='#af52ed' />
					<p className='muted'>Boost puts your profile in the spotlight for 30 minutes.</p>
					<p className='demo-note'>
						This is a preview. No purchase is made and real profile visibility is not changed.
					</p>
					<button className='primary-button full-width' onClick={() => setBoost(false)}>
						Got it
					</button>
				</Modal>
			)}
			{match && (
				<Modal title='It’s a Match!' onClose={() => setMatch(null)} className='match-modal'>
					<p>You and {match.name} have liked each other.</p>
					<div className='match-avatars'>
						<Avatar src={state.profile.photo} name={state.profile.name} />
						<Heart fill='currentColor' />
						<Avatar src={match.photos[0]} name={match.name} />
					</div>
					<button
						className='primary-button full-width'
						onClick={() => {
							openChat(match.id)
							setMatch(null)
						}}
					>
						Send a message
					</button>
					<button className='text-button full-width' onClick={() => setMatch(null)}>
						Keep swiping
					</button>
					<p className='demo-note'>Simulated match · portfolio demo</p>
				</Modal>
			)}
		</div>
	)
}
