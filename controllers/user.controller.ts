import { type Request, type Response } from 'express'
import { findAll, register } from '../services/user.service'
import { type User } from '@prisma/client'

export async function findAllHandler (_req: Request, res: Response): Promise<void> {
  try {
    const users = await findAll()
    res.status(200).json(users)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export async function registerHandler (req: Request, res: Response): Promise<void> {
  try {
    const newUser: User = await register(req.body)
    res.status(200).json(`User ${newUser.name} successfully created with email ${newUser.email}`)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}
