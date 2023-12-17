import bcrypt from 'bcryptjs'
import { PrismaClient, type User } from '@prisma/client'
import { type UserRegister } from '../types/user.types'
import { encryptPassword, toLogin, toRegister } from '../utils/user.utils'

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
export async function register (object: any): Promise<User> {
  const newUser: UserRegister = toRegister(object)

  newUser.password = await encryptPassword(newUser.password)

  try {
    const user: User = await prisma.user.create({
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

export async function login (object: any): Promise<User> {
  const userLogin = toLogin(object)

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: userLogin.email
      }
    })

    if (user == null) {
      throw new Error('Invalid credentials')
    }

    const passwordMatch = await bcrypt.compare(userLogin.password, user.password)

    if (!passwordMatch) {
      throw new Error('Invalid credentials')
    }

    return user
  } catch (error: any) {
    throw error.message
  }
}
