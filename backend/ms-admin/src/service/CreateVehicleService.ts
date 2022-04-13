import { VehicleRepository } from '@src/repository/VehicleRepository';
import RequestResponse from '@src/interface/RequestResponse';
import HttpStatusCodes from '@src/util/enum/HttpStatusCodes';
import { formatResponse } from '@src/util/format-response';
import BadRequestError from '@src/util/error/BadRequestError';
import { VehicleInterface } from '@src/interface/Request';
import { RabbitMQProducer } from '@src/util/rabbitmq-producer';

export default class CreateVehicleService {
  private vehicleRepository = new VehicleRepository();
  private rabbitMQProducer = new RabbitMQProducer();

  public async execute(data: VehicleInterface): Promise<RequestResponse> {
    const vehicleExists = await this.vehicleRepository.findByPlate(data.plate);
    if (vehicleExists) {
      throw new BadRequestError(
        'Vehicle Registration',
        `Vehicle with plate ${vehicleExists.plate} already registered`,
      );
    }

    const vehicle = await this.vehicleRepository.create(data);
    const result = await this.vehicleRepository.findById(vehicle.vehicleId);

    const message = {
      event: 'create',
      ...result,
    };
    await this.rabbitMQProducer.sendMessage(
      process.env.RABBITMQ_QUEUE,
      message,
    );

    return formatResponse(HttpStatusCodes.CREATED, 'Success', result);
  }
}
