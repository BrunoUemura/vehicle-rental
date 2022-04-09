import { Response, NextFunction, Request } from 'express';

import FindOrdersService from '@src/service/FindOrdersService';
import { RequestValidation } from '@src/validation/RequestValidation';

export default class FindOrdersController {
  public async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | NextFunction> {
    try {
      await RequestValidation.validateRequest(request);
      const queryParams = request.query;

      const service = new FindOrdersService();
      const result = await service.execute(queryParams);

      return response.json(result);
    } catch (err) {
      next(err);
    }
  }
}
