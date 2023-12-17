import { PrismaClient, type User } from '@prisma/client'
import { type NewUserEntry } from '../types/user.types'
import toNewUser from '../utils/user.utils'

const prisma = new PrismaClient()

/**
 * Retrieves all users from the database.
 * @returns {Promise<User[]>} A promise that resolves to an array of users.
 */
export async function findAll (): Promise<User[]> {
  const users = await prisma.user.findMany()
  return users
}

/**
 * Registers a new user.
 * @param object - The user object to be registered. Has type 'any' because it comes from the request body.
 * @error - Code 'P2002' is thrown when the a unique constraint is infringed.
 */
export async function register (object: any): Promise<NewUserEntry> {
  const newUser = toNewUser(object)

  try {
    const user = await prisma.user.create({
      data: newUser
    })
    return user
  } catch (error: any) {
    if (error.code === 'P2002') {
      throw new Error('User already exists')
    }
    throw error.message
  }
}
