import { Router } from 'express'
import { findAllHandler, registerHandler } from '../controllers/user.controller'
import { authMiddleware, loginHandler, logoutHandler } from '../auth/auth.controller'

const router = Router()

router.get('/', authMiddleware, (req, res, next) => {
  findAllHandler(req, res).catch(next)
})
router.post('/register', (req, res, next) => {
  registerHandler(req, res).catch(next)
})
router.post('/login', (req, res, next) => {
  loginHandler(req, res).catch(next)
})
router.post('/logout', authMiddleware, (req, res, next) => {
  logoutHandler(req, res).catch(next)
})

export default router
