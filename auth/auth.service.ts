import { type CookieOptions, type Response } from 'express'
import jwt from 'jsonwebtoken'
import { type User } from '@prisma/client'
import { Cookies, TokenExpiration } from '../types/auth.enum'
import { type RefreshToken, type AccessToken, type TokenPayload } from '../types/auth.types'
import { accessTokenSecret, isProduction, refreshTokenSecret } from '../config'

function signAccessToken (payload: TokenPayload): string {
  return jwt.sign(payload, accessTokenSecret, { expiresIn: TokenExpiration.AccessToken })
}

function signRefreshToken (payload: TokenPayload): string {
  return jwt.sign(payload, refreshTokenSecret, { expiresIn: TokenExpiration.RefreshToken })
}

const defaultCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: isProduction
}

const refreshTokenCookieOptions: CookieOptions = {
  ...defaultCookieOptions,
  maxAge: TokenExpiration.RefreshToken
}

const accessTokenCookieOptions: CookieOptions = {
  ...defaultCookieOptions,
  maxAge: TokenExpiration.AccessToken
}

export function verifyRefreshToken (token: string): RefreshToken {
  return jwt.verify(token, refreshTokenSecret) as RefreshToken
}

export function verifyAccessToken (token: string): AccessToken {
  return jwt.verify(token, accessTokenSecret) as AccessToken
}

export function buildTokens (user: User): { accessToken: string, refreshToken: string } {
  const { id } = user

  const tokenPayload: TokenPayload = { id: String(id) }

  const accessToken = signAccessToken(tokenPayload)
  const refreshToken = signRefreshToken(tokenPayload)

  return { accessToken, refreshToken }
}

export function setTokens (res: Response, access: string, refresh?: string): void {
  res.cookie(Cookies.AccessToken, access, accessTokenCookieOptions)
  if (refresh != null) res.cookie(Cookies.RefreshToken, refresh, refreshTokenCookieOptions)
}

export function refreshTokens (current: RefreshToken): { accessToken: string, refreshToken: string } {
  const accessPayload: TokenPayload = { id: current.id }
  let refreshPayload: TokenPayload | undefined

  const accessToken = signAccessToken(accessPayload)
  const refreshToken = (refreshPayload != null) ? signRefreshToken(refreshPayload) : ''

  return { accessToken, refreshToken }
}

export function clearTokens (res: Response): void {
  res.cookie(Cookies.AccessToken, '', { ...defaultCookieOptions, maxAge: 0 })
  res.cookie(Cookies.RefreshToken, '', { ...defaultCookieOptions, maxAge: 0 })
}
