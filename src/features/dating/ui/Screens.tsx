import {
	useEffect,
	useRef,
	useState,
	type Dispatch,
	type SetStateAction,
	type FormEvent,
	type ChangeEvent
} from 'react'
import {
	ArrowLeft,
	ArrowUpRight,
	BadgeCheck,
	Camera,
	Check,
	CheckCheck,
	Heart,
	MapPin,
	MessageCircle,
	Search,
	Send,
	ShieldCheck,
	Sparkles
} from 'lucide-react'
import { interests, people, type DemoState } from '../model/data'
import { Avatar, Empty, Entrance, Modal } from './common'
type SharedProps = { state: DemoState; setState: Dispatch<SetStateAction<DemoState>> }
export function Likes({
	state,
	openChat,
	discover
}: {
	state: DemoState
	openChat: (id: string) => void
	discover: () => void
}) {
	const [tab, setTab] = useState<'matches' | 'sent'>('matches')
	const profiles = people.filter(p =>
		tab === 'matches' ? state.matches.includes(p.id) : state.decisions.some(d => d.id === p.id && d.action !== 'pass')
	)
	return (
		<Entrance>
			<div className='page-heading reveal'>
				<div>
					<div className='eyebrow'>ХИМИЯ НАЧИНАЕТСЯ ЗДЕСЬ</div>
					<h1>
						Кажется, это взаимно<span>.</span>
					</h1>
					<p>Один маленький шаг навстречу большой истории.</p>
				</div>
				<span className='heading-icon'>
					<Heart size={25} />
				</span>
			</div>
			<div className='segmented-tabs reveal'>
				<button className={tab === 'matches' ? 'selected' : ''} onClick={() => setTab('matches')}>
					Взаимные <span>{state.matches.length}</span>
				</button>
				<button className={tab === 'sent' ? 'selected' : ''} onClick={() => setTab('sent')}>
					Мои симпатии <span>{state.decisions.filter(d => d.action !== 'pass').length}</span>
				</button>
			</div>
			{profiles.length ? (
				<div className='likes-grid'>
					{profiles.map(p => (
						<article className='like-card reveal' key={p.id}>
							<div className='like-card-photo'>
								<img src={p.photos[0]} alt={p.name} />
								<span className='mini-match'>
									<Heart size={13} fill='currentColor' />
									{state.matches.includes(p.id) ? 'Взаимно' : 'Симпатия отправлена'}
								</span>
							</div>
							<div className='like-card-body'>
								<h2>
									{p.name}, {p.age}
									<BadgeCheck size={19} />
								</h2>
								<p>
									<MapPin size={13} />
									{p.distance} км от тебя
								</p>
								{state.matches.includes(p.id) ? (
									<button className='outline-button' onClick={() => openChat(p.id)}>
										<MessageCircle size={16} />
										Сказать привет
										<ArrowUpRight size={16} />
									</button>
								) : (
									<span className='pending-like'>Ждём встречной симпатии</span>
								)}
							</div>
						</article>
					))}
				</div>
			) : (
				<Empty
					title='Здесь будет твоя история'
					text='Ставь лайки тем, кто тебе интересен. Сохраним все твои симпатии здесь.'
					action='Найти своего человека'
					onAction={discover}
				/>
			)}
		</Entrance>
	)
}
export function Messages({
	state,
	setState,
	activeId,
	setActiveId
}: SharedProps & { activeId: string | null; setActiveId: (id: string | null) => void }) {
	const [search, setSearch] = useState('')
	const [draft, setDraft] = useState('')
	const bottom = useRef<HTMLDivElement>(null)
	const person = people.find(p => p.id === activeId && state.matches.includes(p.id))
	const messages = person ? state.messages[person.id] || [] : []
	useEffect(() => {
		bottom.current?.scrollIntoView({ behavior: 'instant', block: 'nearest' })
	}, [activeId, messages.length])
	const matches = people.filter(
		p => state.matches.includes(p.id) && p.name.toLowerCase().includes(search.toLowerCase())
	)
	function send(e: FormEvent) {
		e.preventDefault()
		if (!draft.trim() || !person) return
		const msg = {
			id: crypto.randomUUID(),
			text: draft.trim(),
			mine: true,
			time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
		}
		setState(s => ({ ...s, messages: { ...s.messages, [person.id]: [...(s.messages[person.id] || []), msg] } }))
		setDraft('')
	}
	return (
		<Entrance>
			<div className='page-heading reveal'>
				<div>
					<div className='eyebrow'>ВСЁ НАЧИНАЕТСЯ С «ПРИВЕТ»</div>
					<h1>
						Ближе с каждым словом<span>.</span>
					</h1>
					<p>Место, где симпатии становятся разговорами.</p>
				</div>
			</div>
			<div className={`messenger reveal ${person ? 'has-chat' : ''}`}>
				<section className='conversation-list'>
					<div className='conversation-title'>
						<h2>Сообщения</h2>
						<span>{state.matches.length}</span>
					</div>
					<label className='search-field'>
						<Search size={17} />
						<input
							aria-label='Поиск по сообщениям'
							placeholder='Найти человека'
							value={search}
							onChange={e => setSearch(e.target.value)}
						/>
					</label>
					{matches.map(p => {
						const last = state.messages[p.id]?.at(-1)
						return (
							<button
								className={`conversation ${p.id === activeId ? 'active' : ''}`}
								key={p.id}
								onClick={() => {
									setActiveId(p.id)
									setDraft('')
								}}
							>
								<span className='avatar-wrap'>
									<Avatar src={p.photos[0]} name={p.name} />
									{p.online && <i />}
								</span>
								<span className='conversation-text'>
									<strong>
										{p.name}
										<small>{last?.time || 'Новый мэтч'}</small>
									</strong>
									<span>{last ? `${last.mine ? 'Ты: ' : ''}${last.text}` : 'Скажи первое «привет»'}</span>
								</span>
							</button>
						)
					})}
					{!matches.length && <p className='list-empty'>Никого не нашли. Попробуй другое имя.</p>}
					<div className='conversation-foot'>
						<ShieldCheck size={14} />
						Общение начинается с уважения
					</div>
				</section>
				<section className='chat-pane'>
					{person ? (
						<>
							<header className='chat-header'>
								<button
									className='icon-button mobile-back'
									aria-label='К списку сообщений'
									onClick={() => setActiveId(null)}
								>
									<ArrowLeft size={19} />
								</button>
								<Avatar src={person.photos[0]} name={person.name} />
								<div>
									<strong>
										{person.name}, {person.age}
										<BadgeCheck size={16} />
									</strong>
									<small>{person.online ? 'Сейчас в сети' : 'Недавно в сети'}</small>
								</div>
								<span className='chat-demo'>Демо-чат</span>
							</header>
							<div className='chat-body'>
								<div className='chat-start'>
									<Heart size={20} />
									<p>Вы понравились друг другу</p>
									<span>Отличный повод познакомиться поближе</span>
								</div>
								{!messages.length && (
									<div className='icebreaker'>
										<Sparkles size={18} />
										<p>Не знаешь, с чего начать?</p>
										<button onClick={() => setDraft(`Привет, ${person.name}! Как выглядит твой идеальный выходной?`)}>
											Спросить об идеальном выходном
											<ArrowUpRight size={15} />
										</button>
									</div>
								)}
								{messages.map(m => (
									<div className={`message ${m.mine ? 'mine' : ''}`} key={m.id}>
										<p>{m.text}</p>
										<span>
											{m.time}
											{m.mine && <CheckCheck size={12} />}
										</span>
									</div>
								))}
								<div ref={bottom} />
							</div>
							<form className='message-composer' onSubmit={send}>
								<input
									aria-label='Сообщение'
									placeholder='Напиши что-нибудь настоящее…'
									maxLength={2000}
									value={draft}
									onChange={e => setDraft(e.target.value)}
								/>
								<button aria-label='Отправить сообщение' disabled={!draft.trim()}>
									<Send size={19} />
								</button>
							</form>
							<p className='demo-disclosure'>Демонстрация: сообщения сохраняются только в этом браузере.</p>
						</>
					) : (
						<Empty
							title='Хороший разговор ждёт'
							text='Выбери взаимную симпатию и начни знакомство с простого «привет».'
						/>
					)}
				</section>
			</div>
		</Entrance>
	)
}
export function Profile({ state, setState, toast }: SharedProps & { toast: (text: string) => void }) {
	const [editing, setEditing] = useState(false)
	const [draft, setDraft] = useState(state.profile)
	const file = useRef<HTMLInputElement>(null)
	const filled = Math.round(
		([!!state.profile.name, !!state.profile.bio, state.profile.tags.length >= 3, !!state.profile.photo].filter(Boolean)
			.length /
			4) *
			100
	)
	async function upload(e: ChangeEvent<HTMLInputElement>) {
		const selected = e.target.files?.[0]
		if (!selected) return
		if (!['image/jpeg', 'image/png', 'image/webp'].includes(selected.type)) {
			toast('Выбери фотографию JPG, PNG или WebP')
			return
		}
		if (selected.size > 5 * 1024 * 1024) {
			toast('Фото должно быть меньше 5 МБ')
			return
		}
		const image = new Image()
		const url = URL.createObjectURL(selected)
		image.onload = () => {
			try {
				const canvas = document.createElement('canvas')
				const ratio = Math.min(1, 800 / Math.max(image.width, image.height))
				canvas.width = image.width * ratio
				canvas.height = image.height * ratio
				canvas.getContext('2d')!.drawImage(image, 0, 0, canvas.width, canvas.height)
				setState(s => ({ ...s, profile: { ...s.profile, photo: canvas.toDataURL('image/jpeg', 0.8) } }))
				toast('Фото обновлено')
			} finally {
				URL.revokeObjectURL(url)
			}
		}
		image.onerror = () => {
			URL.revokeObjectURL(url)
			toast('Не удалось прочитать фотографию')
		}
		image.src = url
		e.target.value = ''
	}
	return (
		<Entrance>
			<div className='page-heading reveal'>
				<div>
					<div className='eyebrow'>САМАЯ ИНТЕРЕСНАЯ ВЕРСИЯ — НАСТОЯЩАЯ</div>
					<h1>
						Это всё ты<span>.</span>
					</h1>
					<p>Расскажи о том, что делает тебя собой.</p>
				</div>
			</div>
			<div className='profile-layout'>
				<section className='own-profile reveal'>
					<div className='own-photo'>
						<img src={state.profile.photo} alt='Твоя фотография' />
						<button className='icon-button' aria-label='Изменить фото' onClick={() => file.current?.click()}>
							<Camera size={20} />
						</button>
						<input ref={file} type='file' accept='image/jpeg,image/png,image/webp' hidden onChange={upload} />
					</div>
					<div className='own-profile-info'>
						<h2>
							{state.profile.name}, {state.profile.age}
							<BadgeCheck size={23} />
						</h2>
						<p>
							<MapPin size={15} />
							Москва
						</p>
						<button
							className='primary-button'
							onClick={() => {
								setDraft(state.profile)
								setEditing(true)
							}}
						>
							Редактировать профиль
							<ArrowUpRight size={17} />
						</button>
					</div>
				</section>
				<section className='profile-details'>
					<div className='surface reveal'>
						<div className='completion-heading'>
							<h3>Хорошее начало</h3>
							<strong>{filled}%</strong>
						</div>
						<div className='completion-track'>
							<span style={{ width: `${filled}%` }} />
						</div>
						<p className='muted'>
							{filled === 100
								? 'Твоя анкета заполнена. Осталось встретить своего человека.'
								: 'Добавь описание и хотя бы три интереса — так проще найти общее.'}
						</p>
					</div>
					<div className='surface reveal'>
						<div className='eyebrow'>ОБО МНЕ</div>
						<p className='profile-bio'>{state.profile.bio || 'Пара слов о себе — и знакомиться уже проще.'}</p>
						<div className='aside-divider' />
						<div className='eyebrow'>МОИ ИНТЕРЕСЫ</div>
						<div className='interest-list'>
							{state.profile.tags.map(t => (
								<span key={t} className='interest common'>
									{t}
								</span>
							))}
						</div>
					</div>
					<div className='gentle-note reveal'>
						<Sparkles size={23} />
						<div>
							<h3>Не идеально. По-настоящему.</h3>
							<p>Живые фотографии и пара честных слов работают лучше заученных фраз.</p>
						</div>
					</div>
				</section>
			</div>
			{editing && (
				<Modal title='Твой профиль' onClose={() => setEditing(false)}>
					<form
						onSubmit={e => {
							e.preventDefault()
							setState(s => ({ ...s, profile: { ...draft, name: draft.name.trim(), bio: draft.bio.trim() } }))
							setEditing(false)
							toast('Изменения сохранены')
						}}
					>
						<div className='form-row'>
							<label>
								Имя
								<input
									required
									minLength={2}
									maxLength={30}
									value={draft.name}
									onChange={e => setDraft(d => ({ ...d, name: e.target.value }))}
								/>
							</label>
							<label>
								Возраст
								<input
									type='number'
									required
									min={18}
									max={99}
									value={draft.age}
									onChange={e => setDraft(d => ({ ...d, age: Number(e.target.value) }))}
								/>
							</label>
						</div>
						<label>
							О себе
							<textarea
								aria-label='О себе'
								rows={4}
								maxLength={300}
								value={draft.bio}
								onChange={e => setDraft(d => ({ ...d, bio: e.target.value }))}
							/>
						</label>
						<p className='field-label'>
							Интересы <span>до 6</span>
						</p>
						<div className='interest-list editable'>
							{interests.map(t => (
								<button
									type='button'
									aria-pressed={draft.tags.includes(t)}
									key={t}
									className={`interest ${draft.tags.includes(t) ? 'common' : ''}`}
									onClick={() =>
										setDraft(d => ({
											...d,
											tags: d.tags.includes(t)
												? d.tags.filter(x => x !== t)
												: d.tags.length < 6
													? [...d.tags, t]
													: d.tags
										}))
									}
								>
									{draft.tags.includes(t) && <Check size={13} />}
									{t}
								</button>
							))}
						</div>
						<button className='primary-button form-submit' disabled={draft.name.trim().length < 2}>
							Сохранить изменения
						</button>
					</form>
				</Modal>
			)}
		</Entrance>
	)
}
export function Filters({ state, setState, onClose }: SharedProps & { onClose: () => void }) {
	const [filters, setFilters] = useState(state.filters)
	const count = people.filter(
		p =>
			p.age >= filters.minAge &&
			p.age <= filters.maxAge &&
			p.distance <= filters.distance &&
			(!filters.online || p.online)
	).length
	return (
		<Modal title='Кого ты хочешь встретить?' onClose={onClose}>
			<p className='muted'>Немного ориентиров для хороших совпадений.</p>
			<form
				onSubmit={e => {
					e.preventDefault()
					setState(s => ({ ...s, filters }))
					onClose()
				}}
			>
				<div className='form-row'>
					<label>
						Возраст от
						<input
							type='number'
							min={18}
							max={filters.maxAge}
							required
							value={filters.minAge}
							onChange={e => setFilters(f => ({ ...f, minAge: Number(e.target.value) }))}
						/>
					</label>
					<label>
						Возраст до
						<input
							type='number'
							min={filters.minAge}
							max={99}
							required
							value={filters.maxAge}
							onChange={e => setFilters(f => ({ ...f, maxAge: Number(e.target.value) }))}
						/>
					</label>
				</div>
				<label className='range-label'>
					Расстояние <strong>до {filters.distance} км</strong>
					<input
						aria-label='Максимальное расстояние'
						type='range'
						min={1}
						max={100}
						value={filters.distance}
						onChange={e => setFilters(f => ({ ...f, distance: Number(e.target.value) }))}
					/>
				</label>
				<label className='toggle-row'>
					<span>
						Только онлайн<small>Те, кто сейчас готов к общению</small>
					</span>
					<input
						type='checkbox'
						role='switch'
						checked={filters.online}
						onChange={e => setFilters(f => ({ ...f, online: e.target.checked }))}
					/>
				</label>
				<p className='filter-result'>Подходящих анкет в демо: {count}</p>
				<button className='primary-button form-submit'>Применить фильтры</button>
				<button
					type='button'
					className='text-button full-width'
					onClick={() => setFilters({ minAge: 18, maxAge: 35, distance: 25, online: false })}
				>
					Сбросить
				</button>
			</form>
		</Modal>
	)
}
export function Settings({ state, setState, reset }: SharedProps & { reset: () => void }) {
	const [confirm, setConfirm] = useState(false)
	return (
		<Entrance>
			<div className='page-heading reveal'>
				<div>
					<div className='eyebrow'>ТВОЙ КОМФОРТ НА ПЕРВОМ МЕСТЕ</div>
					<h1>
						В твоём ритме<span>.</span>
					</h1>
					<p>Маленькие настройки для приятных знакомств.</p>
				</div>
			</div>
			<div className='settings-content'>
				<div className='surface reveal'>
					<h2>Предпочтения</h2>
					<label className='toggle-row'>
						<span>
							Уведомления в приложении<small>Показывать подсказки о новых возможностях</small>
						</span>
						<input
							type='checkbox'
							role='switch'
							checked={state.notifications}
							onChange={e => setState(s => ({ ...s, notifications: e.target.checked }))}
						/>
					</label>
				</div>
				<div className='surface reveal'>
					<ShieldCheck className='accent-icon' size={26} />
					<h2>Знакомься бережно</h2>
					<p className='muted'>
						Для первой встречи выбирай общественное место. Не отправляй деньги и личные документы незнакомым людям.
						Доверяй своему ощущению комфорта.
					</p>
				</div>
				<div className='surface reveal'>
					<h2>О mello</h2>
					<p className='muted'>
						Демонстрационное приложение о настоящих знакомствах. Все анкеты, симпатии и диалоги вымышлены. Данные
						хранятся в твоём браузере, реальные сообщения не отправляются.
					</p>
					<div className='settings-bottom'>
						<span>mello · demo 1.0</span>
						<button className='text-button danger' onClick={() => setConfirm(true)}>
							Начать демо заново
						</button>
					</div>
				</div>
			</div>
			{confirm && (
				<Modal title='Начать с чистого листа?' onClose={() => setConfirm(false)}>
					<p className='muted'>Твои сообщения, изменения профиля и симпатии в этом демо будут сброшены.</p>
					<button
						className='primary-button form-submit'
						onClick={() => {
							reset()
							setConfirm(false)
						}}
					>
						Да, начать заново
					</button>
					<button className='text-button full-width' onClick={() => setConfirm(false)}>
						Оставить как есть
					</button>
				</Modal>
			)}
		</Entrance>
	)
}
