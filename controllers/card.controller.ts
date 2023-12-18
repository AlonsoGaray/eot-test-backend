import axios from 'axios'
import { type Request, type Response } from 'express'

export async function findLatestTen (req: Request, res: Response): Promise<void> {
  const {
    pageSize = '10',
    q = '',
    page = '1',
    orderBy = '-set.releaseDate,name'
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
