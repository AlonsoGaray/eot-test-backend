import { Router } from 'express'
import { findAllHandler, registerHandler } from '../controllers/user.controller'

const router = Router()

router.get('/', (req, res, next) => {
  findAllHandler(req, res).catch(next)
})
router.post('/register', (req, res, next) => {
  registerHandler(req, res).catch(next)
})

export default router
