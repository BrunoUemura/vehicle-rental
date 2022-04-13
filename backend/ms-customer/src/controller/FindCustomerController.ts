import { Response, NextFunction, Request } from 'express';

import FindCustomerService from '@src/service/FindCustomerService';
import BadRequestError from '@src/util/error/BadRequestError';
import { RequestValidation } from '@src/validation/RequestValidation';

export default class FindCustomerController {
  public async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | NextFunction> {
    try {
      await RequestValidation.validateRequest(request);

      const { id } = request.params;
      const service = new FindCustomerService();
      const result = await service.execute(id);
      return response.json(result);
    } catch (err) {
      next(err);
    }
  }
}
