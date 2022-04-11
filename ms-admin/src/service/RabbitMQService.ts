import logger from '@src/config/logger';
import { VehicleInterface } from '@src/interface/Request';
import { VehicleRepository } from '@src/repository/VehicleRepository';

export class RabbitMQService {
  async handleEvent(message: VehicleInterface) {
    const vehicleRepository = new VehicleRepository();

    logger.info(`[RabbitMQ]: Event ${message.event}`);

    switch (message.event) {
      case 'create':
        await vehicleRepository.create(message);
        break;
      case 'update':
        await vehicleRepository.update(message);
        break;
      case 'delete':
        await vehicleRepository.deleteById(message.vehicleId);
        break;
      case 'updateStatus':
        await vehicleRepository.updateStatus(
          message.vehicleId,
          message.available,
        );
        break;
      default:
        break;
    }
  }
}
