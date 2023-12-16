import { findAll } from "../services/user.service";

export async function findAllHandler(_req: Request, res: any) {
  try {
    const users = await findAll();
    return res.status(200).json(users);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}

