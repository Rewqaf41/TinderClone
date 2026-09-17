import { useRef, useState, type Dispatch, type SetStateAction } from 'react'
import {
	BadgeCheck,
	Camera,
	ChevronLeft,
	ChevronRight,
	Heart,
	Info,
	MessageCircle,
	Pencil,
	Plus,
	Puzzle,
	Settings,
	X
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import type { DemoState } from '../model/data'
import { personalityTypes, communicationStyles, loveLanguages } from '@/features/profile/model/moreAboutMeModal.data'
import { POPULAR_TAGS } from '@/shared/constants/constants'
import { readPhoto } from '../model/photos'
import { Avatar, Entrance, Modal } from './common'
type Props = { state: DemoState; setState: Dispatch<SetStateAction<DemoState>>; toast: (text: string) => void }
export function ProfileHome({ state }: Props) {
	const navigate = useNavigate()
	const [slide, setSlide] = useState(0)
	const [premium, setPremium] = useState(false)
	const offers = [
		'Tinder Platinum™',
		'Tinder Gold™',
		'Tinder Plus™',
		'Stand out with Super Likes',
		'Make your first move',
		'Meet someone new'
	]
	const profile = state.profile
	const completion = Math.min(
		100,
		20 +
			profile.photos.length * 4 +
			(profile.bio ? 15 : 0) +
			(profile.tags.length ? 15 : 0) +
			[profile.personality, profile.communication, profile.loveLanguage].filter(Boolean).length * 14
	)
	return (
		<Entrance className='profile-home'>
			<section className='profile-summary reveal'>
				<div className='avatar-progress' style={{ background: `conic-gradient(#dfe2e7 ${completion}%, #30343c 0)` }}>
					<Avatar src={profile.photo} name={profile.name} />
					<span>{completion}% complete</span>
				</div>
				<h1>
					{profile.name}, {profile.age}
					{profile.verified && <BadgeCheck size={20} />}
				</h1>
				<div className='profile-actions'>
					<button onClick={() => navigate('/settings')}>
						<span>
							<Settings size={20} />
						</span>
						Settings
					</button>
					<button className='edit-action' onClick={() => navigate('/profile/edit')}>
						<span>
							<Pencil size={20} />
							<i />
						</span>
						Edit profile
					</button>
					<button className='add-action' onClick={() => navigate('/profile/edit?media=1')}>
						<span>
							<Camera size={21} />
							<b>+</b>
						</span>
						Add media
					</button>
				</div>
			</section>
			<section className='platinum-panel reveal'>
				<h2>{offers[slide]}</h2>
				<p>
					{slide < 3 ? 'Level up every action you take on Tinder' : 'A little extra spark for your next connection'}
				</p>
				<div className='offer-dots'>
					{offers.map((offer, i) => (
						<button
							key={offer}
							aria-label={`Show ${offer}`}
							aria-current={slide === i}
							className={slide === i ? 'active' : ''}
							onClick={() => setSlide(i)}
						/>
					))}
				</div>
				<button className='premium-button' onClick={() => setPremium(true)}>
					GET {slide < 3 ? offers[slide].toUpperCase() : 'TINDER PLATINUM™'}
				</button>
			</section>
			{premium && (
				<Modal title={offers[slide]} onClose={() => setPremium(false)}>
					<p className='muted'>See who likes you, revisit profiles and make your next hello stand out.</p>
					<div className='premium-features'>
						<p>✓ Unlimited likes</p>
						<p>✓ Rewind your last swipe</p>
						<p>✓ Priority likes</p>
					</div>
					<p className='demo-note'>Portfolio preview. No subscription or payment is created.</p>
					<button className='primary-button full-width' onClick={() => setPremium(false)}>
						Got it
					</button>
				</Modal>
			)}
		</Entrance>
	)
}
export function PhotoGrid({
	photos,
	onChange,
	toast
}: {
	photos: string[]
	onChange: (photos: string[]) => void
	toast: (text: string) => void
}) {
	const file = useRef<HTMLInputElement>(null)
	const [loading, setLoading] = useState(false)
	return (
		<>
			<div className='photo-grid'>
				{Array.from({ length: 9 }, (_, i) => (
					<div className={`photo-slot ${photos[i] ? 'filled' : ''}`} key={i}>
						{photos[i] ? (
							<>
								<img src={photos[i]} alt={`Your photo ${i + 1}`} />
								<button
									aria-label={`Remove photo ${i + 1}`}
									onClick={() => onChange(photos.filter((_, idx) => i !== idx))}
								>
									<X size={15} />
								</button>
							</>
						) : (
							<button
								className='empty-photo'
								disabled={loading}
								aria-label={`Add photo ${i + 1}`}
								onClick={() => file.current?.click()}
							>
								<span>
									<Plus size={21} />
								</span>
							</button>
						)}
					</div>
				))}
			</div>
			<p className='photo-tip'>
				Add a video, pic or Loop to get 4% closer to completing
				<br />
				your profile and you may even get more Likes.
			</p>
			<button
				className='primary-button add-media-button'
				disabled={loading || photos.length >= 9}
				onClick={() => file.current?.click()}
			>
				{loading ? 'Adding photo…' : 'Add media'}
			</button>
			<input
				ref={file}
				type='file'
				hidden
				multiple
				accept='image/jpeg,image/png,image/webp'
				onChange={async e => {
					const files = Array.from(e.target.files || []).slice(0, 9 - photos.length)
					e.target.value = ''
					if (!files.length) return
					setLoading(true)
					try {
						const added = await Promise.all(files.map(readPhoto))
						onChange([...photos, ...added])
					} catch (error) {
						toast(error instanceof Error ? error.message : 'Could not load this photo.')
					} finally {
						setLoading(false)
					}
				}}
			/>
		</>
	)
}
export function ProfileEditor({ state, setState, toast }: Props) {
	const navigate = useNavigate()
	const [tab, setTab] = useState('edit')
	const [photo, setPhoto] = useState(0)
	const [more, setMore] = useState(false)
	const [passions, setPassions] = useState(false)
	const profile = state.profile
	const update = (patch: Partial<DemoState['profile']>) =>
		setState(s => ({ ...s, profile: { ...s.profile, ...patch } }))
	return (
		<Entrance className='profile-editor'>
			<header className='editor-header'>
				<button aria-label='Back to profile' className='icon-button' onClick={() => navigate('/profile')}>
					<ChevronLeft />
				</button>
				<h1>Edit profile</h1>
				<button
					className='text-button'
					onClick={() => {
						toast('Profile saved')
						navigate('/profile')
					}}
				>
					Done
				</button>
			</header>
			<div className='edit-tabs'>
				<button className={tab === 'edit' ? 'active' : ''} onClick={() => setTab('edit')}>
					Edit
				</button>
				<button
					className={tab === 'preview' ? 'active' : ''}
					onClick={() => {
						setPhoto(0)
						setTab('preview')
					}}
				>
					Preview
				</button>
			</div>
			{tab === 'preview' ? (
				<div className='profile-preview reveal'>
					<div className='preview-photo'>
						<img src={profile.photos[photo] || '/images/fallback.svg'} alt='Profile preview' />
						<div className='card-shade' />
						<div className='photo-indicators'>
							{profile.photos.map((_, i) => (
								<button
									key={i}
									aria-label={`Preview photo ${i + 1}`}
									className={i === photo ? 'active' : ''}
									onClick={() => setPhoto(i)}
								/>
							))}
						</div>
						<div className='preview-caption'>
							<h2>
								{profile.name} <span>{profile.age}</span>
							</h2>
							<button aria-label='About your profile' onClick={() => setMore(true)}>
								<Info size={22} fill='white' color='#111418' />
							</button>
						</div>
					</div>
				</div>
			) : (
				<div className='editor-scroll'>
					<section className='media-section'>
						<PhotoGrid
							photos={profile.photos}
							toast={toast}
							onChange={photos => update({ photos, photo: photos[0] || '/images/fallback.svg' })}
						/>
					</section>
					<label className='settings-row smart-photos'>
						<span>
							Smart Photos<small>Put your best photo first.</small>
						</span>
						<input
							type='checkbox'
							role='switch'
							checked={profile.smartPhotos}
							onChange={e => update({ smartPhotos: e.target.checked })}
						/>
					</label>
					<section className='edit-fields'>
						<label>
							Name
							<input
								aria-label='Name'
								value={profile.name}
								maxLength={30}
								onChange={e => update({ name: e.target.value })}
								onBlur={() => {
									if (!profile.name.trim()) update({ name: 'Alex' })
								}}
							/>
						</label>
						<label>
							Age
							<input
								aria-label='Age'
								type='number'
								min={18}
								max={99}
								value={profile.age}
								onChange={e => update({ age: Number(e.target.value) })}
								onBlur={() => update({ age: Math.max(18, Math.min(99, profile.age || 18)) })}
							/>
						</label>
						<label>
							About me
							<textarea
								aria-label='About me'
								maxLength={300}
								rows={3}
								placeholder='A few words about you…'
								value={profile.bio}
								onChange={e => update({ bio: e.target.value })}
							/>
						</label>
					</section>
					<button className='edit-link' onClick={() => setPassions(true)}>
						<span>
							Passions<small>{profile.tags.join(', ') || 'Add your interests'}</small>
						</span>
						<ChevronRight size={18} />
					</button>
					<button className='edit-link' onClick={() => setMore(true)}>
						<span>
							More about me<small>Personality, communication & love language</small>
						</span>
						<ChevronRight size={18} />
					</button>
				</div>
			)}
			{more && (
				<Modal title='More about me' onClose={() => setMore(false)} className='bottom-sheet'>
					<p className='muted'>Put your best self forward by adding more about you</p>
					{[
						{
							label: 'What’s your personality type?',
							key: 'personality' as const,
							values: personalityTypes,
							icon: Puzzle
						},
						{
							label: 'What’s your communication style?',
							key: 'communication' as const,
							values: communicationStyles,
							icon: MessageCircle
						},
						{ label: 'How do you receive love?', key: 'loveLanguage' as const, values: loveLanguages, icon: Heart }
					].map(({ label, key, values, icon: Icon }) => (
						<section className='about-section' key={key}>
							<h3>
								<Icon size={18} />
								{label}
							</h3>
							<div className='pills'>
								{values.map(value => (
									<button
										key={value}
										className={profile[key] === value ? 'selected' : ''}
										aria-pressed={profile[key] === value}
										onClick={() => update({ [key]: profile[key] === value ? '' : value })}
									>
										{value}
									</button>
								))}
							</div>
						</section>
					))}
					<button className='primary-button full-width' onClick={() => setMore(false)}>
						Done
					</button>
				</Modal>
			)}
			{passions && (
				<Modal title='Passions' onClose={() => setPassions(false)} className='bottom-sheet'>
					<p className='muted'>Choose up to 5 things you love.</p>
					<div className='pills'>
						{POPULAR_TAGS.map(t => (
							<button
								className={profile.tags.includes(t) ? 'selected' : ''}
								aria-pressed={profile.tags.includes(t)}
								key={t}
								onClick={() =>
									update({
										tags: profile.tags.includes(t)
											? profile.tags.filter(x => x !== t)
											: profile.tags.length < 5
												? [...profile.tags, t]
												: profile.tags
									})
								}
							>
								{t}
							</button>
						))}
					</div>
					<button className='primary-button full-width' onClick={() => setPassions(false)}>
						Done
					</button>
				</Modal>
			)}
		</Entrance>
	)
}
