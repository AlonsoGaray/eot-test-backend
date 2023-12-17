import { PrismaClient, type UserCard } from '@prisma/client'

const prisma = new PrismaClient()

export async function getUserCards (email: string): Promise<UserCard[] | null> {
  const userCards = await prisma.user.findUnique({
    where: {
      email
    },
    select: {
      cards: true
    }
  })

  if (userCards === null || userCards === undefined) {
    throw new Error(`User with email ${email} not found`)
  }

  return userCards.cards
}
