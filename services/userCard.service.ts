import { PrismaClient, type UserCard } from '@prisma/client'

const prisma = new PrismaClient()

export async function getUserCards (userId: string): Promise<UserCard[]> {
  const asd = await prisma.userCard.findMany({
    where: {
      userId
    }
  })
  return asd
}

export async function findUserCardRelation (userId: string, cardId: string): Promise<any> {
  return await prisma.userCard.findFirst({
    where: {
      userId,
      cardId
    }
  })
}

export async function addCard (userId: string, cardId: string): Promise<any> {
  const finUserCard = await findUserCardRelation(userId, cardId)

  if (finUserCard === null || finUserCard === undefined) {
    return await prisma.userCard.create({
      data: {
        userId,
        cardId,
        amount: 1
      }
    })
  }

  if (finUserCard.amount === 2) {
    throw new Error('You already have 2 of this card')
  }

  return await prisma.userCard.update({
    where: {
      id: finUserCard.id
    },
    data: {
      amount: finUserCard.amount + 1
    }
  })
}

export async function decreaseCard (userId: string, cardId: string): Promise<any> {
  const finUserCard = await findUserCardRelation(userId, cardId)

  if (finUserCard === null || finUserCard === undefined) {
    throw new Error('You do not have this card yet')
  }

  if (finUserCard.amount === 1) {
    return await prisma.userCard.delete({
      where: {
        id: finUserCard.id
      }
    })
  }

  return await prisma.userCard.update({
    where: {
      id: finUserCard.id
    },
    data: {
      amount: finUserCard.amount - 1
    }
  })
}
