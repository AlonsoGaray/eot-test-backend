import { Router } from 'express'
import { searchCards, findCardsByIdHandler } from '../controllers/card.controller'

const router = Router()

router.get('/', (req, res, next) => {
  searchCards(req, res).catch(next)
})
router.get('/userCards', (req, res, next) => {
  findCardsByIdHandler(req, res).catch(next)
})

export default router
