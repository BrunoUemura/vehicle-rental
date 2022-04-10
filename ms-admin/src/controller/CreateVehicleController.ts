import { Response, NextFunction, Request } from 'express';

import { RequestValidation } from '@src/validation/RequestValidation';
import CreateVehicleService from '@src/service/CreateVehicleService';

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
      return response.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }
}
