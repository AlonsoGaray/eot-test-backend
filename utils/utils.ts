import { type UserEnum } from '../types/user.enum'

export function isString (string: any): boolean {
  return typeof string === 'string' || string instanceof String
}

export function parseString (string: any, value: UserEnum): string {
  if (!isString(string)) {
    throw new Error(`Incorrect or missing ${value}`)
  }

  return string
}
