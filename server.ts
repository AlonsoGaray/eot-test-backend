// express server
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import routes from './routes/index'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'

const app = express()
const port = process.env.PORT || 3001

app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
dotenv.config()

app.get('/', (_req, res) => {
  res.status(200).json({ message: 'api is runing' })
})

app.listen(port, () => {
  // Routes
  routes(app)

  console.log(`Server runing at http://localhost:${port}`)
})
