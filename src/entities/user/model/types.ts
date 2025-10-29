export interface IUser {
  id: string
  name: string
  age: number
  tags: string[]
  photos: string[]
  bio?: string
}

export interface IRegistrationData {
  name: string
  tags: string[]
  photos: string[]
}