import { Router } from "express";
import { findAllHandler } from "../controllers/user.controller";

const router = Router();

router.get("/", findAllHandler);

export default router
