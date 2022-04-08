import { Response, NextFunction, Request } from 'express';

import DeleteCustomerService from '@src/service/DeleteCustomerService';
import { RequestValidation } from '@src/validation/RequestValidation';

export default class DeleteCustomerController {
  public async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | NextFunction> {
    try {
      await RequestValidation.validateRequest(request);

      const { id } = request.params;

      const service = new DeleteCustomerService();
      const result = await service.execute(id);
      return response.json(result);
    } catch (err) {
      next(err);
    }
  }
}
