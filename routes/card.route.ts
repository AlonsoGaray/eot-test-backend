import { Router } from 'express'
import { searchCards } from '../controllers/card.controller'

const router = Router()

router.get('/', (req, res, next) => {
  searchCards(req, res).catch(next)
})

export default router
