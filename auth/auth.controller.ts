import { type NextFunction, type Request, type Response } from 'express'
import { buildTokens, clearTokens, refreshAccessToken, setTokens } from './auth.service'
import { TokenEnum } from '../types/auth.enum'
import { type User } from '@prisma/client'
import { login } from '../services/user.service'
import { verifyToken } from './jwt.service'

export function authMiddleware (req: Request, res: Response, next: NextFunction): void {
  try {
    const accessToken = req.header('Authorization')?.split(' ')[1] ?? ''
    const token = verifyToken(accessToken, TokenEnum.AccessToken)

    res.locals.token = token

    next()
  } catch (error) {
    res.status(401).json({ error: 'Unauthenticated' })
  }
}

export function refreshTokenMiddleware (req: Request, res: Response): void {
  try {
    const refreshToken: string = req.cookies[TokenEnum.RefreshToken] ?? ''
    const payload = verifyToken(refreshToken, TokenEnum.RefreshToken)

    const accessToken = refreshAccessToken(payload)

    res.status(200).json({ token: accessToken })
  } catch (error) {
    res.status(401).json({ error: 'Unauthenticated' })
  }
}

export async function loginHandler (req: Request, res: Response): Promise<void> {
  try {
    const userLogin: User = await login(req.body)

    const { accessToken, refreshToken } = buildTokens(userLogin)
    await setTokens(res, refreshToken, userLogin)

    res.status(200).json({ token: accessToken })
  } catch (error: any) {
    res.status(500).json({ error })
  }
}

export async function logoutHandler (req: Request, res: Response): Promise<void> {
  try {
    const refreshToken: string = req.cookies[TokenEnum.RefreshToken] ?? ''
    await clearTokens(res, refreshToken)
    res.status(200).json('User successfully logged out')
  } catch (error: any) {
    res.status(500).json({ error: 'Unauthenticated' })
  }
}
