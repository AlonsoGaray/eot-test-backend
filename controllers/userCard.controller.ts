import { getUserCards } from "../services/userCard.service";

export async function getUserCardsHandler(req: any, res: any) {
  const { email } = req.query
  try {
    const userCards = await getUserCards(email);
    return res.status(200).json(userCards);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}