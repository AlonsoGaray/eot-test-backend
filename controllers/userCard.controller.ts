import { type Request, type Response } from 'express'
import { addCard, getUserCards, decreaseCard } from '../services/userCard.service'

export async function getUserCardsHandler (req: Request, res: Response): Promise<Response> {
  try {
    const { userId } = req.params
    const userCards = await getUserCards(userId)
    return res.status(200).json(userCards)
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}

export async function addCardHandler (req: Request, res: Response): Promise<Response> {
  try {
    const { userId, cardId }: { userId: string, cardId: string } = req.body
    const userCards = await addCard(userId ?? '', cardId ?? '')
    return res.status(200).json(userCards)
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}

export async function decreaseCardHandler (req: Request, res: Response): Promise<Response> {
  try {
    const { userId, cardId }: { userId: string, cardId: string } = req.body
    const userCards = await decreaseCard(userId ?? '', cardId ?? '')
    return res.status(200).json(userCards)
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}
