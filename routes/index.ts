import UserRouter from './user.route';
import UserCardRouter from './userCard.route';
import CardRouter from './card.route';

function routes(app: any) {
  app.use('/api/user', UserRouter);
  app.use('/api/card', CardRouter);
  app.use('/api/user-card', UserCardRouter);
}

export default routes;