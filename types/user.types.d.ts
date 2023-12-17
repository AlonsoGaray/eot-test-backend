import { type User } from '@prisma/client'

export type UserRegister = Omit<User, 'id' | 'tokenVersion'>
export type UserLogin = Pick<User, 'email' | 'password'>
