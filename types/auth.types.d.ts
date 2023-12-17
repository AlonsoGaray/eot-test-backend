import { type Token } from '@prisma/client'

export type TokenPayload = Pick<Token, 'id'>
