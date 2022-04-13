import { Response, NextFunction, Request } from 'express';

import FindVehicleService from '@src/service/FindVehicleService';
import { RequestValidation } from '@src/validation/RequestValidation';

export default class FindVehicleController {
  public async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | NextFunction> {
    try {
      await RequestValidation.validateRequest(request);

      const data = request.query;

      const service = new FindVehicleService();
      const result = await service.execute(data);
      return response.json(result);
    } catch (err) {
      next(err);
    }
  }
}
