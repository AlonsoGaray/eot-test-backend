import { type Request, type Response } from 'express'
import { getUserCards } from '../services/userCard.service'

export async function getUserCardsHandler (req: Request, res: Response): Promise<Response> {
  const { email } = req.query
  console.log('🚀 ~ file: userCard.controller.ts:6 ~ getUserCardsHandler ~ email:', email)
  try {
    const userCards = await getUserCards(email as string) // Ensure email is of type string
    return res.status(200).json(userCards)
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}
