import { Response, NextFunction, Request } from 'express';

import DeleteVehicleService from '@src/service/DeleteVehicleService';
import { RequestValidation } from '@src/validation/RequestValidation';

export default class DeleteVehicleController {
  public async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | NextFunction> {
    try {
      await RequestValidation.validateRequest(request);

      const { id } = request.params;

      const service = new DeleteVehicleService();
      const result = await service.execute(id);
      return response.json(result);
    } catch (err) {
      next(err);
    }
  }
}
