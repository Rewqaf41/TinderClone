export interface Person {
	id: string
	name: string
	age: number
	distance: number
	job: string
	photos: string[]
	bio: string
	tags: string[]
	prompt: string
	answer: string
	online: boolean
}
export const people: Person[] = [
	{
		id: 'anna',
		name: 'Анна',
		age: 25,
		distance: 3,
		job: 'Дизайнер',
		photos: ['/images/anna.jpg', '/images/coffee.jpg', '/images/travel.jpg'],
		bio: 'Замечаю красивое в обычном. Собираю маленькие путешествия, винил и места с самым вкусным кофе. Давай потеряемся в городе?',
		tags: ['Искусство', 'Кофе', 'Путешествия', 'Инди-музыка'],
		prompt: 'Моё идеальное воскресенье',
		answer: 'Поздний завтрак, книжный и прогулка без маршрута. А дальше — как пойдёт.',
		online: true
	},
	{
		id: 'sofia',
		name: 'София',
		age: 24,
		distance: 5,
		job: 'Архитектор',
		photos: ['/images/sofia.jpg', '/images/travel.jpg'],
		bio: 'Влюблена в архитектуру, горы и спонтанные планы. Всегда знаю, где самый красивый закат.',
		tags: ['Архитектура', 'Путешествия', 'Фотография'],
		prompt: 'Давай начнём с',
		answer: 'Прогулки по любимым местам. Покажешь свой город?',
		online: true
	},
	{
		id: 'maria',
		name: 'Мария',
		age: 27,
		distance: 8,
		job: 'Редактор',
		photos: ['/images/maria.jpg', '/images/coffee.jpg'],
		bio: 'Читаю между строк, пеку банановый хлеб и смеюсь над плохими шутками. Хорошие тоже принимаются.',
		tags: ['Книги', 'Кофе', 'Кино'],
		prompt: 'Маленькая радость',
		answer: 'Когда дождь за окном, а у тебя новая книга и никаких планов.',
		online: false
	},
	{
		id: 'alisa',
		name: 'Алиса',
		age: 23,
		distance: 2,
		job: 'Фотограф',
		photos: ['/images/alisa.jpg', '/images/travel.jpg'],
		bio: 'Ловлю свет и моменты. Могу часами говорить о кино и уехать на выходные к морю.',
		tags: ['Фотография', 'Кино', 'Путешествия'],
		prompt: 'Вместе мы могли бы',
		answer: 'Составить плейлист для путешествия, которое ещё не придумали.',
		online: true
	},
	{
		id: 'dasha',
		name: 'Дарья',
		age: 26,
		distance: 12,
		job: 'Маркетолог',
		photos: ['/images/dasha.jpg', '/images/coffee.jpg'],
		bio: 'На неделе — идеи и проекты, на выходных — йога, друзья и новые тропинки. За баланс во всём.',
		tags: ['Йога', 'Кофе', 'Искусство'],
		prompt: 'Мой зелёный флаг',
		answer: 'Ты добр к людям и умеешь смеяться над собой.',
		online: false
	},
	{
		id: 'kate',
		name: 'Катя',
		age: 28,
		distance: 6,
		job: 'Иллюстратор',
		photos: ['/images/kate.jpg', '/images/travel.jpg'],
		bio: 'Рисую истории и выращиваю домашние джунгли. Ищу человека для простых и счастливых дней.',
		tags: ['Искусство', 'Растения', 'Инди-музыка'],
		prompt: 'Счастье — это',
		answer: 'Быть собой рядом с человеком, которому это нравится.',
		online: true
	}
]
export const interests = [
	'Искусство',
	'Кофе',
	'Путешествия',
	'Инди-музыка',
	'Книги',
	'Кино',
	'Йога',
	'Фотография',
	'Спорт',
	'Кулинария',
	'Архитектура',
	'Растения'
]
export type Section = 'discover' | 'explore' | 'likes' | 'messages' | 'profile' | 'settings'
export interface Message {
	id: string
	text: string
	mine: boolean
	time: string
	liked?: boolean
}
export interface DemoState {
	profile: {
		name: string
		age: number
		bio: string
		tags: string[]
		photo: string
		photos: string[]
		smartPhotos: boolean
		personality: string
		communication: string
		loveLanguage: string
		verified: boolean
	}
	onboarded: boolean
	decisions: { id: string; action: 'like' | 'pass' | 'super' }[]
	matches: string[]
	messages: Record<string, Message[]>
	filters: { minAge: number; maxAge: number; distance: number; online: boolean }
	notifications: boolean
}
export const initialState: DemoState = {
	onboarded: false,
	profile: {
		name: 'Александр',
		age: 27,
		bio: 'Люблю спонтанные путешествия, хороший кофе и людей с чувством юмора.',
		tags: ['Кофе', 'Путешествия', 'Кино'],
		photo: '/images/me.jpg',
		photos: ['/images/me.jpg', '/images/travel.jpg'],
		smartPhotos: true,
		personality: '',
		communication: '',
		loveLanguage: '',
		verified: false
	},
	decisions: [],
	matches: ['sofia', 'maria'],
	messages: {
		sofia: [
			{ id: 's1', text: 'Привет! Кажется, мы оба за спонтанные путешествия :)', mine: false, time: '12:40' },
			{ id: 's2', text: 'Привет! Да, особенно если по пути будет хороший кофе', mine: true, time: '12:42' },
			{ id: 's3', text: 'Тогда у меня есть одно место на примете ☕', mine: false, time: '12:43' }
		],
		maria: [{ id: 'm1', text: 'Какую книгу посоветуешь на выходные?', mine: false, time: 'Вчера' }]
	},
	filters: { minAge: 18, maxAge: 35, distance: 25, online: false },
	notifications: true
}
