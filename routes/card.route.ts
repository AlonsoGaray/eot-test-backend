import { Router } from 'express'
import { findAllInDbHandler, findLatestTen } from '../controllers/card.controller'

const router = Router()

router.get('/', (req, res, next) => {
  findAllInDbHandler(req, res).catch(next)
})
router.get('/latest', (req, res, next) => {
  findLatestTen(req, res).catch(next)
})

export default router
