const router = require('express').Router()
const cards = require('../controllers/card.controller.js')

module.exports = app => {
  router.get('/', cards.findLatestTen)

  app.use('/api/cards', router)
}
