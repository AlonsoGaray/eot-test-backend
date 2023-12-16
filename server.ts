// express server
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express()
const port = process.env.PORT || 8080

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

require('dotenv').config()
require('./routes/card.routes')(app)

app.get('/', (_req, res) => {
  res.status(200).json({ message: 'Hello World!' })
})

app.get('/db', async (_req, res) => {
  const cards = await prisma.card.findMany()
  res.status(200).json(cards)
})

app.listen(port, () => {
  console.log(`Server runing at http://localhost:${port}`)
})
