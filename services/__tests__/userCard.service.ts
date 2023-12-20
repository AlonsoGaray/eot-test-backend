import { getUserCards } from '../userCard.service'

describe('userCard service', () => {
  test('return correct value', () => {
    const test = getUserCards('postman')

    expect(test).toEqual([
      {
        id: 29,
        userId: 'postman',
        cardId: 'postman',
        amount: 1
      }
    ])
  })
})
