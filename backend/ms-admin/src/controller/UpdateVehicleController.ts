import { Response, NextFunction, Request } from 'express';

import UpdateVehicleService from '@src/service/UpdateVehicleService';
import { RequestValidation } from '@src/validation/RequestValidation';

export default class UpdateVehicleController {
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
        vehicleId: id,
        ...body,
      };

      const service = new UpdateVehicleService();
      const result = await service.execute(data);
      return response.json(result);
    } catch (err) {
      next(err);
    }
  }
}
