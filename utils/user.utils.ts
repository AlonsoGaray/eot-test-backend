import bcrypt from 'bcryptjs'
import { parseString } from './utils'
import { type UserLogin, type UserRegister } from '../types/user.types'
import { UserEnum } from '../types/user.enum'

/**
 * Converts an object to a UserRegister.
 * @param object - The object to convert.
 * @returns The UserRegister or an error if the object is missing or infringing a required property
 */
export function toRegister (object: any): UserRegister {
  const newUser: UserRegister = {
    name: parseString(object.name, UserEnum.Name),
    ...parseEmailAndPassword(object)
  }

  return newUser
}

/**
 * Converts an object to a UserLogin object.
 * @param object - The object to convert.
 * @returns The converted UserLogin object.
 */
export function toLogin (object: any): UserLogin {
  return parseEmailAndPassword(object)
}

/**
 * Encrypts a password using bcryptjs.
 * @param password - The password to be encrypted.
 * @returns A promise that resolves to the encrypted password.
 */
export async function encryptPassword (password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10)
  const encryptedPassword = await bcrypt.hash(password, salt)

  return encryptedPassword
}

function parseEmailAndPassword (object: any): UserLogin {
  return {
    email: parseString(object.email, UserEnum.Email),
    password: parseString(object.password, UserEnum.Password)
  }
}
