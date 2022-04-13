import { Response, NextFunction, Request } from 'express';

import { RequestValidation } from '@src/validation/RequestValidation';
import CreateVehicleService from '@src/service/CreateVehicleService';
import HttpStatusCodes from '@src/util/enum/HttpStatusCodes';

export default class CreateVehicleController {
  public async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | NextFunction> {
    try {
      await RequestValidation.validateRequest(request);

      const data = request.body;

      const service = new CreateVehicleService();
      const result = await service.execute(data);
      return response.status(HttpStatusCodes.CREATED).json(result);
    } catch (err) {
      next(err);
    }
  }
}
