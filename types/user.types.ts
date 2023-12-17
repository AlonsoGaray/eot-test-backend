import { type User } from '@prisma/client'

export type NewUserEntry = Omit<User, 'id'>

export enum UserEnum {
  Id = 'id',
  Name = 'name',
  Email = 'email',
  Password = 'password'
}
