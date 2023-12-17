import { parseString } from './utils'
import { UserEnum, type NewUserEntry } from '../types/user.types'

const toNewUser = (object: any): NewUserEntry => {
  const newUser: NewUserEntry = {
    name: parseString(object.name, UserEnum.Name),
    email: parseString(object.email, UserEnum.Email),
    password: parseString(object.password, UserEnum.Password)
  }

  return newUser
}

export default toNewUser
