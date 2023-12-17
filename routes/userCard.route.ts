import { Router } from 'express'
import { getUserCardsHandler } from '../controllers/userCard.controller'

const router = Router()

router.get('/', (req, res, next) => {
  getUserCardsHandler(req, res).catch(next)
})

export default router
