import { VehicleRepository } from '@src/repository/VehicleRepository';
import RequestResponse from '@src/interface/RequestResponse';
import HttpStatusCodes from '@src/util/enum/HttpStatusCodes';
import NotFoundError from '@src/util/error/NotFoundError';
import { formatResponse } from '@src/util/format-response';
import { RabbitMQProducer } from '@src/util/rabbitmq-producer';

export default class DeleteVehicleService {
  private vehicleRepository = new VehicleRepository();
  private rabbitMQProducer = new RabbitMQProducer();

  public async execute(vehicleId: string): Promise<RequestResponse> {
    const vehicle = await this.vehicleRepository.findById(vehicleId);

    if (!vehicle)
      throw new NotFoundError('Vehicle Delete', 'Vehicle not registered');

    await this.vehicleRepository.deleteById(vehicleId);

    const message = {
      event: 'delete',
      ...vehicle,
    };

    await this.rabbitMQProducer.sendMessage(
      process.env.RABBITMQ_QUEUE,
      message,
    );

    return formatResponse(HttpStatusCodes.NO_CONTENT, 'Success', null);
  }
}
