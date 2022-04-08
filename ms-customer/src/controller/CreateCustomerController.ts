import { Response, NextFunction, Request } from 'express';

import { RequestValidation } from '@src/validation/RequestValidation';
import CreateCustomerService from '@src/service/CreateCustomerService';

export default class CreateCustomerController {
  public async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | NextFunction> {
    try {
      await RequestValidation.validateRequest(request);

      const data = request.body;

      const service = new CreateCustomerService();
      const result = await service.execute(data);
      return response.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }
}
