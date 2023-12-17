import { type NextFunction, type Request, type Response } from 'express'
import { buildTokens, setTokens, verifyAccessToken } from './auth.service'
import { Cookies } from '../types/auth.enum'
import { type User } from '@prisma/client'
import { login } from '../services/user.service'

export function authMiddleware (req: Request, res: Response, next: NextFunction): void {
  try {
    const token = verifyAccessToken(String(req.cookies[Cookies.AccessToken]))

    res.locals.token = token

    next()
  } catch (error) {
    res.status(401).json({ error: 'Unauthenticated' })
  }
}

export async function loginHandler (req: Request, res: Response): Promise<void> {
  try {
    const userLogin: User = await login(req.body)

    const { accessToken, refreshToken } = buildTokens(userLogin)
    setTokens(res, accessToken, refreshToken)

    res.status(200).json(`User ${userLogin.email} successfully logged in`)
  } catch (error: any) {
    res.status(500).json({ error })
  }
}

export async function logoutHandler (req: Request, res: Response): Promise<void> {
  try {
    verifyAccessToken(String(req.cookies[Cookies.AccessToken]))

    res.cookie('accessToken', '', { maxAge: 0 })
    res.cookie('refreshToken', '', { maxAge: 0 })
    res.status(200).json('User successfully logged out')
  } catch (error: any) {
    res.status(500).json({ error: 'Unauthenticated' })
  }
}
