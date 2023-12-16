import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUserCards(email: string) {
  const userCards = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      cards: true,
    },
  });
  
  if (!userCards) {
    throw new Error(`User with email ${email} not found`);
  }

  return userCards;
}