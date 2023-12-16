// express server
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const app = express()
const port = process.env.PORT || 8080

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

require('dotenv').config()
require('./routes/card.routes')(app)

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World!' })
})

app.listen(port, () => {
  console.log(`Server runing at http://localhost:${port}`)
})
