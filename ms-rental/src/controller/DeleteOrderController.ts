import { Response, NextFunction, Request } from 'express';

import DeleteOrderService from '@src/service/DeleteOrderService';
import { RequestValidation } from '@src/validation/RequestValidation';

export default class DeleteOrderController {
  public async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | NextFunction> {
    try {
      await RequestValidation.validateRequest(request);
      const { id } = request.params;

      const service = new DeleteOrderService();
      const result = await service.execute(id);

      return response.json(result);
    } catch (err) {
      next(err);
    }
  }
}
