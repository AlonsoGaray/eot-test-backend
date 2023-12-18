import UserCardRouter from './userCard.route'
import CardRouter from './card.route'

function routes (app: any): void {
  app.use('/api/card', CardRouter)
  app.use('/api/user-card', UserCardRouter)
}

export default routes
