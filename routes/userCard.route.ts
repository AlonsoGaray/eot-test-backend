import { Router } from "express";
import { getUserCardsHandler } from "../controllers/userCard.controller";

const router = Router();

router.get("/", getUserCardsHandler);

export default router
