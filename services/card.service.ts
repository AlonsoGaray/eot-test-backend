import { PrismaClient, Card } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Retrieves all users from the database.
 * @returns {Promise<Cards[]>} A promise that resolves to an array of users.
 */
export async function findAllInDb(): Promise<Card[]> {
  const cards = await prisma.card.findMany();
  return cards;
}
