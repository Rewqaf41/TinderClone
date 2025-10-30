export interface IProfile {
  id: string
  name: string
  age: number
  tags: string[]
  photos: string[]
  bio: string
  distance?: number
}

export type TSwipeAction = 'rewind'| 'like' | 'dislike' | 'superlike' | 'boost'

export interface ISwipeResult {
  profileId: string
  action: TSwipeAction
}