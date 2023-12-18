import { Router } from 'express'
import { findLatestTen } from '../controllers/card.controller'

const router = Router()

router.get('/latest', (req, res, next) => {
  findLatestTen(req, res).catch(next)
})

export default router
