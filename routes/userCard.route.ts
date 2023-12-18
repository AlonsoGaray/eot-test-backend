import { Router } from 'express'
import { addCardHandler, getUserCardsHandler, decreaseCardHandler } from '../controllers/userCard.controller'

const router = Router()

router.get('/userId/:userId', (req, res, next) => {
  getUserCardsHandler(req, res).catch(next)
})
router.put('/add', (req, res, next) => {
  addCardHandler(req, res).catch(next)
})
router.put('/decrease', (req, res, next) => {
  decreaseCardHandler(req, res).catch(next)
})

export default router
