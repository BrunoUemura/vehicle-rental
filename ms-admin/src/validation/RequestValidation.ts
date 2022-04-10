import { Request } from 'express';

import BadRequestError from '@src/util/error/BadRequestError';
import AuthValidation from './AuthValidation';
import { RequestCreateCustomer } from '@src/interface/Request';

export class RequestValidation {
  public static async validateRequest(request: Request) {
    if (request.method === 'GET' && request.path === '/customer') {
      await AuthValidation.validate(request);
      await this.validateFindRequest(request);
    }

    if (request.method === 'POST' && request.path === '/customer') {
      await this.validateCreateRequest(request);
    }

    if (request.method === 'PUT' && request.path === '/customer') {
      await AuthValidation.validate(request);
      await this.validateUpdateRequest(request);
    }

    if (request.method === 'DELETE' && request.path === '/customer') {
      await AuthValidation.validate(request);
      await this.validateDeleteRequest(request);
    }

    if (request.method === 'POST' && request.path === '/customer/signin') {
      await this.validateSignInRequest(request);
    }
  }

  private static async validateFindRequest(request: Request) {
    if (!request.params)
      throw new BadRequestError(
        'Find Customer',
        'Missing customerId in path parameter',
      );
  }

  private static async validateCreateRequest(request: Request) {
    this.validateBodyParams(request, request.body);
  }

  private static async validateUpdateRequest(request: Request) {
    if (!request.params)
      throw new BadRequestError(
        'Customer Update',
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

  private static async validateSignInRequest(request: Request) {
    if (!request.body.email) {
      throw new BadRequestError(
        'Sign In Customer',
        'Missing email in request body',
      );
    }

    if (!request.body.password) {
      throw new BadRequestError(
        'Sign In Customer',
        'Missing password in request body',
      );
    }
  }

  private static validateBodyParams(
    request: Request,
    body: RequestCreateCustomer,
  ) {
    if (!body.name) {
      throw new BadRequestError(
        'Create Customer',
        'Missing name in request body',
      );
    }

    if (request.method === 'POST' && !body.email) {
      throw new BadRequestError(
        'Create Customer',
        'Missing email in request body',
      );
    }

    if (request.method === 'POST' && !body.password) {
      throw new BadRequestError(
        'Create Customer',
        'Missing password in request body',
      );
    }

    if (!body.documentNumber) {
      throw new BadRequestError(
        'Create Customer',
        'Missing documentNumber in request body',
      );
    }

    if (!body.phoneNumber) {
      throw new BadRequestError(
        'Create Customer',
        'Missing phoneNumber in request body',
      );
    }

    if (!body.address) {
      throw new BadRequestError(
        'Create Customer',
        'Missing address in request body',
      );
    }
  }
}
