import { Router } from 'express-serve-static-core'
import { findLatestTen } from '../controllers/card.controller.js'
import express from 'express'

const router = express.Router()

module.exports = (app: { use: (arg0: string, arg1: Router) => void }) => {
  router.get('/', findLatestTen)

  app.use('/api/cards', router)
}
