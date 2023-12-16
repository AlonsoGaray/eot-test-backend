import axios from "axios"
import { QueryParams } from "../types/card.types"

export const findLatestTen = (req: { query: QueryParams }, res: { send: (arg0: any) => void }) => {
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

  axios.request(options)
    .then(function (response: { data: any }) {
      res.send(response.data)
    })
    .catch(function (error: { message: any }) {
      console.error(error.message)
    })
}
