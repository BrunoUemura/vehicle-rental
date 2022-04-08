import { Request } from 'express';

import BadRequestError from '@src/util/error/BadRequestError';
import AuthValidation from './AuthValidation';
import { RequestCreateCustomer } from '@src/interface/Request';

export class RequestValidation {
  public static async validateRequest(request: Request) {
    // await AuthValidation.validate(request);

    if (request.method === 'GET' && request.path === '/customer') {
      await this.validateFindRequest(request);
    }

    if (request.method === 'POST' && request.path === '/customer') {
      await this.validateCreateRequest(request);
    }

    if (request.method === 'PUT' && request.path === '/customer') {
      await this.validateUpdateRequest(request);
    }

    if (request.method === 'DELETE' && request.path === '/customer') {
      await this.validateDeleteRequest(request);
    }
  }

  private static validateBodyParams(
    request: Request,
    body: RequestCreateCustomer,
  ) {
    if (!body.name) {
      throw new BadRequestError('Request Body', 'Missing name in body');
    }

    if (request.method === 'POST' && !body.email) {
      throw new BadRequestError('Request Body', 'Missing email in body');
    }

    if (request.method === 'POST' && !body.password) {
      throw new BadRequestError('Request Body', 'Missing password in body');
    }

    if (!body.documentNumber) {
      throw new BadRequestError(
        'Request Body',
        'Missing documentNumber in body',
      );
    }

    if (!body.phoneNumber) {
      throw new BadRequestError('Request Body', 'Missing phoneNumber in body');
    }

    if (!body.address) {
      throw new BadRequestError('Request Body', 'Missing address in body');
    }
  }

  private static async validateFindRequest(request: Request) {
    if (!request.query.userId)
      throw new BadRequestError(
        'Request Query Parameter',
        'Missing userId query parameter',
      );
  }

  private static async validateCreateRequest(request: Request) {
    this.validateBodyParams(request, request.body);
  }

  private static async validateUpdateRequest(request: Request) {
    if (!request.params)
      throw new BadRequestError(
        'Request Path Parameter',
        'Missing customerId in path parameter',
      );

    this.validateBodyParams(request, request.body);
  }

  private static async validateDeleteRequest(request: Request) {
    if (!request.params)
      throw new BadRequestError(
        'Request Path Parameter',
        'Missing customerId in path parameter',
      );
  }
}
