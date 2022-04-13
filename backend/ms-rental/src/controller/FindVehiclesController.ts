import { Response, NextFunction, Request } from 'express';

import FindVehiclesService from '@src/service/FindVehiclesService';

export default class FindVehiclesController {
  public async handle(
    _request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | NextFunction> {
    try {
      const service = new FindVehiclesService();
      const result = await service.execute();
      return response.json(result);
    } catch (err) {
      next(err);
    }
  }
}
