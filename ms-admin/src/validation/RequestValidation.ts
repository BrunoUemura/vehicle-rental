import { Request } from 'express';

import BadRequestError from '@src/util/error/BadRequestError';
import AuthValidation from './AuthValidation';
import { VehicleInterface } from '@src/interface/Request';

export class RequestValidation {
  public static async validateRequest(request: Request) {
    if (request.method === 'GET' && request.path === '/vehicle') {
      await this.validateFindRequest(request);
    }

    if (request.method === 'POST' && request.path === '/vehicle') {
      await this.validateCreateRequest(request);
    }

    if (request.method === 'PUT' && request.path === '/vehicle') {
      await this.validateUpdateRequest(request);
    }

    if (request.method === 'DELETE' && request.path === '/vehicle') {
      await this.validateDeleteRequest(request);
    }
  }

  private static async validateFindRequest(request: Request) {
    if (!request.query)
      throw new BadRequestError(
        'Vehicle Retrieve',
        'Missing vehicleId or plate in query parameter',
      );
  }

  private static async validateCreateRequest(request: Request) {
    // this.validateBodyParams(request, request.body);
  }

  private static async validateUpdateRequest(request: Request) {
    if (!request.params)
      throw new BadRequestError(
        'Customer Update',
        'Missing customerId in path parameter',
      );

    // this.validateBodyParams(request, request.body);
  }

  private static async validateDeleteRequest(request: Request) {
    if (!request.params)
      throw new BadRequestError(
        'Request Path Parameter',
        'Missing customerId in path parameter',
      );
  }

  // private static validateBodyParams(request: Request, body: VehicleInterface) {
  //   if (!body.name) {
  //     throw new BadRequestError(
  //       'Create Customer',
  //       'Missing name in request body',
  //     );
  //   }

  //   if (request.method === 'POST' && !body.email) {
  //     throw new BadRequestError(
  //       'Create Customer',
  //       'Missing email in request body',
  //     );
  //   }

  //   if (request.method === 'POST' && !body.password) {
  //     throw new BadRequestError(
  //       'Create Customer',
  //       'Missing password in request body',
  //     );
  //   }

  //   if (!body.documentNumber) {
  //     throw new BadRequestError(
  //       'Create Customer',
  //       'Missing documentNumber in request body',
  //     );
  //   }

  //   if (!body.phoneNumber) {
  //     throw new BadRequestError(
  //       'Create Customer',
  //       'Missing phoneNumber in request body',
  //     );
  //   }

  //   if (!body.address) {
  //     throw new BadRequestError(
  //       'Create Customer',
  //       'Missing address in request body',
  //     );
  //   }
  // }
}
