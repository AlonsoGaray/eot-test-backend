import { Router } from 'express'
import { findAllInDbHandler, findLatestTen } from '../controllers/card.controller'

const router = Router()

router.get('/', findAllInDbHandler)
router.get('/latest', findLatestTen)

export default router

