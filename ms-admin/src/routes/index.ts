import { NextFunction, Request, Response, Router } from 'express';
import NotFoundError from '@src/util/error/NotFoundError';
import vehicle from '@src/routes/vehicle.routes';

const routes = Router();

routes.use('/api/v1/', vehicle);
routes.use((request: Request, _response: Response, next: NextFunction) => {
  if (!request.route) {
    return next(new NotFoundError('Request Endpoint', 'Route not found'));
  }
  next();
});

export default routes;
