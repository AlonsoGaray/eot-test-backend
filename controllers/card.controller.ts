import axios from "axios"
import { QueryParams } from "../types/card.types"
import { findAllInDb } from "../services/card.service"

export async function findAllInDbHandler(_req: Request, res: any) {
  try {
    const users = await findAllInDb();
    return res.status(200).json(users);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}


export async function findLatestTen(req: { query: QueryParams }, res: { send: (arg0: any) => void }) {
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
      res.send(response.data)
    })
    .catch(function (error: { message: any }) {
      console.error(error.message)
    })
}
