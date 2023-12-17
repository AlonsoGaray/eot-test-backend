import { type Request, type Response } from 'express'
import { findAll, register } from '../services/user.service'
import { type NewUserEntry } from '../types/user.types'

export async function findAllHandler (_req: Request, res: Response): Promise<Response> {
  try {
    const users = await findAll()
    return res.status(200).json(users)
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}

export async function registerHandler (req: Request, res: Response): Promise<void> {
  try {
    const newUser: NewUserEntry = await register(req.body)
    res.status(200).json(`User ${newUser.name} successfully created with email ${newUser.email}`)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}
