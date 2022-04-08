import { NextFunction, Request, Response, Router } from 'express';
import NotFoundError from '@src/util/error/NotFoundError';
import customer from '@src/routes/customer.routes';

const routes = Router();

routes.use('/api/v1/', customer);
routes.use((request: Request, _response: Response, next: NextFunction) => {
  if (!request.route) {
    return next(new NotFoundError('Request Endpoint', 'Route not found'));
  }
  next();
});

export default routes;
