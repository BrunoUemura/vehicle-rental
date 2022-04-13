import RequestResponse from '@src/interface/RequestResponse';
import HttpStatusCodes from '@src/util/enum/HttpStatusCodes';
import { formatResponse } from '@src/util/format-response';
import { VehicleRepository } from '@src/repository/VehicleRepository';

export default class FindVehiclesService {
  private vehicleRepository = new VehicleRepository();

  public async execute(): Promise<RequestResponse> {
    const result = await this.vehicleRepository.findAll();
    return formatResponse(HttpStatusCodes.OK, 'Success', result);
  }
}
