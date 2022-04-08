import { Response, NextFunction, Request } from 'express';

import UpdateCustomerService from '@src/service/UpdateCustomerService';
import { RequestValidation } from '@src/validation/RequestValidation';

export default class UpdateCustomerController {
  public async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | NextFunction> {
    try {
      await RequestValidation.validateRequest(request);

      const { id } = request.params;
      const body = request.body;
      const data = {
        customerId: id,
        ...body,
      };

      const service = new UpdateCustomerService();
      const result = await service.execute(data);
      return response.json(result);
    } catch (err) {
      next(err);
    }
  }
}
