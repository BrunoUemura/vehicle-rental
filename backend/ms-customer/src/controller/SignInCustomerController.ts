import { Response, NextFunction, Request } from 'express';

import { RequestValidation } from '@src/validation/RequestValidation';
import SignInCustomerService from '@src/service/SignInCustomerService';
import HttpStatusCodes from '@src/util/enum/HttpStatusCodes';

export default class SignInCustomerController {
  public async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | NextFunction> {
    try {
      await RequestValidation.validateRequest(request);

      const data = request.body;

      const service = new SignInCustomerService();
      const result = await service.execute(data);
      return response.status(HttpStatusCodes.CREATED).json(result);
    } catch (err) {
      next(err);
    }
  }
}
