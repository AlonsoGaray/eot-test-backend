import { Router } from 'express'
import { findAllInDbHandler, findLatestTen } from '../controllers/card.controller'
import { authMiddleware } from '../auth/auth.controller'

const router = Router()

router.get('/', authMiddleware, (req, res, next) => {
  findAllInDbHandler(req, res).catch(next)
})
router.get('/latest', authMiddleware, (req, res, next) => {
  findLatestTen(req, res).catch(next)
})

export default router
