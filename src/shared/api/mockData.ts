import type { IProfile } from '@/entities/profile/model/types'
import { POPULAR_TAGS } from '../constants/constants'

const firstNames = [
  'Александра', 'Мария', 'Анна', 'Екатерина', 'Дарья',
  'Александр', 'Дмитрий', 'Максим', 'Иван', 'Артем',
  'София', 'Виктория', 'Полина', 'Алина', 'Ксения',
  'Никита', 'Андрей', 'Михаил', 'Егор', 'Денис'
]

const bios = [
  'Люблю путешествия и новые впечатления ✨',
  'В поиске человека для совместных приключений',
  'Кофе, книги и долгие прогулки - мой идеальный день',
  'Ценю искренность и чувство юмора',
  'Foodie и любитель активного отдыха',
  'Мечтаю объехать весь мир 🌍',
  'Музыка - моя страсть и вдохновение',
  'Ищу того, с кем буду смеяться каждый день',
  'Спортивная и позитивная 💪',
  'Творческая душа в поиске музы'
]

const generatePhotoUrl = (seed: number, index: number): string => {
  return `https://placehold.co/400x600?text=Image+${seed + index}`
}

// Генерация случайного профиля
const generateProfile = (id: number): IProfile => {
  const name = firstNames[Math.floor(Math.random() * firstNames.length)]
  const age = Math.floor(Math.random() * 17) + 18
  const distance = Math.floor(Math.random() * 50) + 1
  const photoCount = Math.floor(Math.random() * 4) + 2
  
  const photos = Array.from(
    { length: photoCount },
    (_, i) => generatePhotoUrl(id * 100, i)
  )
  
  const profileTags = Array.from(
    { length: Math.floor(Math.random() * 4) + 2 },
    () => POPULAR_TAGS[Math.floor(Math.random() * POPULAR_TAGS.length)]
  ).filter((tag, index, self) => self.indexOf(tag) === index)
  
  const bio = bios[Math.floor(Math.random() * bios.length)]
  
  return {
    id: `profile-${id}`,
    name,
    age,
    tags: profileTags,
    photos,
    bio,
    distance,
  }
}

export const generateProfiles = (count: number): IProfile[] => {
  return Array.from({ length: count }, (_, i) => generateProfile(i + 1))
}

export const mockProfiles: IProfile[] = generateProfiles(50)