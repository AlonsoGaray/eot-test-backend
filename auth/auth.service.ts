import { type CookieOptions, type Response } from 'express'
import { PrismaClient, type Token, type User } from '@prisma/client'
import { TokenEnum, TokenExpiration } from '../types/auth.enum'
import { accessTokenSecret, isProduction, refreshTokenSecret } from '../config'
import { signToken } from './jwt.service'

const prisma = new PrismaClient()

const defaultCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: isProduction
}

const refreshTokenCookieOptions: CookieOptions = {
  ...defaultCookieOptions,
  maxAge: TokenExpiration.RefreshToken
}

export function buildTokens (user: User): { accessToken: string, refreshToken: string } {
  const { id } = user

  const accessToken = signToken({ id }, accessTokenSecret, TokenExpiration.AccessToken)
  const refreshToken = signToken({ id }, refreshTokenSecret, TokenExpiration.RefreshToken)

  return { accessToken, refreshToken }
}

export async function setTokens (res: Response, refresh: string, userLogin: User): Promise<void> {
  const expireAt = new Date()
  expireAt.setDate(expireAt.getDate() + 7)

  const found: Token | null = await prisma.token.findFirst({
    where: {
      userId: userLogin.id
    }
  })

  if (found == null) {
    await prisma.token.create({
      data: {
        userId: userLogin.id,
        token: refresh,
        expireAt
      }
    })
  } else {
    await prisma.token.update({
      where: {
        id: found.id
      },
      data: {
        token: refresh,
        expireAt
      }
    })
  }

  res.cookie(TokenEnum.RefreshToken, refresh, refreshTokenCookieOptions)
}

export function refreshAccessToken (token: Token): string {
  const { id } = token

  const accessToken = signToken({ id }, accessTokenSecret, TokenExpiration.AccessToken)

  return accessToken
}

export async function clearTokens (res: Response, refreshToken: string): Promise<void> {
  await prisma.token.delete({
    where: {
      token: refreshToken
    }
  })
  res.cookie(TokenEnum.AccessToken, '', { ...defaultCookieOptions, maxAge: 0 })
  res.cookie(TokenEnum.RefreshToken, '', { ...defaultCookieOptions, maxAge: 0 })
}
