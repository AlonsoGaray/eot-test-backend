import { Router } from 'express'
import { findLatestTen } from '../controllers/card.controller.js'

const router = Router()

router.get('/', findLatestTen)

export default router

