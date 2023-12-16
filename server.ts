// express server
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import routes from './routes/index'

const app = express()
const port = process.env.PORT || 8080

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

require('dotenv').config()

app.get('/', (_req, res) => {
  res.status(200).json({ message: 'Hello World!' })
})

app.listen(port, () => {
  // Routes
  routes(app)

  console.log(`Server runing at http://localhost:${port}`)
})
