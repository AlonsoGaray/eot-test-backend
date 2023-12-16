import UserRouter from './user.route';
import UserCardRouter from './userCard.route';

function routes(app: any) {
  app.use('/api/user', UserRouter);
  app.use('/api/user-card', UserCardRouter);
}

export default routes;