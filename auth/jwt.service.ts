import jwt from 'jsonwebtoken'
import { accessTokenSecret, refreshTokenSecret } from '../config'
import { TokenEnum } from '../types/auth.enum'
import { type TokenPayload } from '../types/auth.types'
import { type Token } from '@prisma/client'

export function signToken (payload: TokenPayload, secret: string, expiresIn: number): string {
  return jwt.sign(payload, secret, { expiresIn })
}

export function verifyToken (token: string, type: TokenEnum): Token {
  let secret: string
  switch (type) {
    case TokenEnum.AccessToken:
      secret = accessTokenSecret
      break
    case TokenEnum.RefreshToken:
      secret = refreshTokenSecret
      break
    default:
      throw new Error('Unsupported token type')
  }
  return jwt.verify(token, secret) as Token
}
