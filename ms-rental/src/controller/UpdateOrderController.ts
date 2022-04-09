import { Response, NextFunction, Request } from 'express';

import UpdateOrderService from '@src/service/UpdateOrderService';
import { RequestValidation } from '@src/validation/RequestValidation';

export default class UpdateOrderController {
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
        orderId: id,
        ...body,
      };

      const service = new UpdateOrderService();
      const result = await service.execute(data);

      return response.json(result);
    } catch (err) {
      next(err);
    }
  }
}
