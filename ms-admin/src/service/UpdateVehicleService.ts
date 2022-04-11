import { VehicleRepository } from '@src/repository/VehicleRepository';
import RequestResponse from '@src/interface/RequestResponse';
import HttpStatusCodes from '@src/util/enum/HttpStatusCodes';
import NotFoundError from '@src/util/error/NotFoundError';
import { formatResponse } from '@src/util/format-response';
import { VehicleInterface } from '@src/interface/Request';
import { RabbitMQProducer } from '@src/util/rabbitmq-producer';

export default class UpdateVehicleService {
  private vehicleRepository = new VehicleRepository();
  private rabbitMQProducer = new RabbitMQProducer();

  public async execute(data: VehicleInterface): Promise<RequestResponse> {
    const vehicle = await this.vehicleRepository.findById(data.vehicleId);
    if (!vehicle)
      throw new NotFoundError(`Vehicle Update`, 'Vehicle not registered');

    const vehicleUpdated = await this.vehicleRepository.update(data);

    const message = {
      event: 'update',
      ...vehicleUpdated,
    };
    await this.rabbitMQProducer.sendMessage(
      process.env.RABBITMQ_QUEUE,
      message,
    );

    return formatResponse(
      HttpStatusCodes.OK,
      'Success',
      `Successfully updated vehicle ${vehicleUpdated.vehicleId}`,
    );
  }
}
