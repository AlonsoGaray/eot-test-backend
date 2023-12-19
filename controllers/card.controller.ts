import axios from 'axios'
import { type Request, type Response } from 'express'
import { findCardsById } from '../services/card.service'

export async function searchCards (req: Request, res: Response): Promise<void> {
  const {
    pageSize = '10',
    q = 'name:*',
    page = '1',
    orderBy = '-set.releaseDate'
  } = req.query

  const options = {
    method: 'GET',
    url: `${process.env.POKEMON_API_URL}/cards`,
    params: {
      pageSize,
      q,
      page,
      orderBy
    },
    headers: {
      'X-Api-Key': process.env.POKEMON_API_KEY
    }
  }

  await axios.request(options)
    .then(function (response: { data: any }) {
      return res.status(200).json(response.data)
    })
    .catch(function (error: any) {
      return res.status(500).json({ error: error.message })
    })
}

export async function findCardsByIdHandler (req: Request, res: Response): Promise<void> {
  const { userCards } = req.query
  try {
    const cardsArray = await findCardsById(userCards)

    res.status(200).json(cardsArray)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}
