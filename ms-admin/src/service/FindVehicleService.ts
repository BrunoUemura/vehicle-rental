import { VehicleRepository } from '@src/repository/VehicleRepository';
import RequestResponse from '@src/interface/RequestResponse';
import HttpStatusCodes from '@src/util/enum/HttpStatusCodes';
import NotFoundError from '@src/util/error/NotFoundError';
import { formatResponse } from '@src/util/format-response';
import { VehicleFind } from '@src/interface/Request';
import { Vehicle } from '@prisma/client';

export default class FindVehicleService {
  private vehicleRepository = new VehicleRepository();

  public async execute(data: VehicleFind): Promise<RequestResponse> {
    let vehicle: Vehicle[];

    if (data.vehicleId) {
      vehicle.push(await this.vehicleRepository.findById(data.vehicleId));
    } else if (data.plate) {
      vehicle.push(await this.vehicleRepository.findByPlate(data.plate));
    } else {
      vehicle = await this.vehicleRepository.findAll();
    }

    if (vehicle.length === 0)
      throw new NotFoundError('Vehicle Retrieve', 'No vehicle found');
    return formatResponse(HttpStatusCodes.OK, 'Success', vehicle);
  }
}
