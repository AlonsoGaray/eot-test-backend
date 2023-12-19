import axios from 'axios'

export async function findCardsById (userCards: any): Promise<any> {
  const cardsArray = []

  try {
    for (const card of userCards) {
      const response = await axios.get(`${process.env.POKEMON_API_URL}/cards/${card.cardId}`, {
        headers: {
          'X-Api-Key': process.env.POKEMON_API_KEY
        }
      })
      cardsArray.push(response.data.data)
    }

    const map = cardsArray.map(card => {
      return {
        id: card.id,
        name: card.name,
        number: card.number,
        set: {
          name: card.set.name,
          series: card.set.series,
          total: card.set.total
        },
        images: {
          small: card.images.small
        }
      }
    })
    return { data: map, totalCount: map.length }
  } catch (error) {
    throw new Error("Couldn't find card")
  }
}
