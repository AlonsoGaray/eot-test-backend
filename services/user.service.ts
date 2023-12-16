import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Retrieves all users from the database.
 * @returns {Promise<User[]>} A promise that resolves to an array of users.
 */
export async function findAll(): Promise<User[]> {
  const users = await prisma.user.findMany();
  return users;
}
