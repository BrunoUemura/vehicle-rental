import NotFoundError from '@src/util/error/NotFoundError';
import express, { NextFunction, Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
const microservices = JSON.parse(process.env.ENDPOINTS);

Object.entries(microservices).forEach(([endpoint, address]) =>
  app.use(endpoint, createProxyMiddleware(address)),
);

app.use((request: Request, _response: Response, next: NextFunction) => {
  if (!request.route) {
    return next(new NotFoundError('Request Endpoint', 'Route not found'));
  }
  next();
});

export default app;
