import { Request } from 'express';

import BadRequestError from '@src/util/error/BadRequestError';
import AuthValidation from './AuthValidation';
import { CreateOrder, UpdateOrder } from '@src/interface/Request';

export class RequestValidation {
  public static async validateRequest(request: Request) {
    await AuthValidation.validate(request);

    if (request.method === 'GET' && request.path === '/order') {
      await this.validateRequestQueryParams(request);
    }

    if (request.method === 'POST' && request.path === '/order') {
      await this.validateRequestBody(request.body);
    }

    if (request.method === 'PUT' && request.path === '/order') {
      await this.validateRequestPathParams(request);
      await this.validateRequestBody(request.body);
    }

    if (request.method === 'DELETE' && request.path === '/order') {
      await this.validateRequestPathParams(request);
    }
  }

  private static async validateRequestQueryParams(request: Request) {
    if (!request.query)
      throw new BadRequestError(
        'Request Query Parameter',
        'Missing query parameter. Please provide at least customerId or orderId.',
      );
  }

  private static async validateRequestPathParams(request: Request) {
    if (!request.params)
      throw new BadRequestError(
        'Request Path Parameter',
        'Missing path parameter',
      );
  }

  private static async validateRequestBody(body: UpdateOrder) {
    if (!body.customerId) {
      throw new BadRequestError(
        'Request Body',
        'Missing customerId in request body',
      );
    }

    if (!body.vehicleId) {
      throw new BadRequestError(
        'Request Body',
        'Missing vehicleId in request body',
      );
    }

    if (!body.startDate) {
      throw new BadRequestError(
        'Request Body',
        'Missing startDate in request body',
      );
    }

    if (!body.endDate) {
      throw new BadRequestError(
        'Request Body',
        'Missing endDate in request body',
      );
    }
  }
}
