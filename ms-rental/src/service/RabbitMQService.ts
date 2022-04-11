import logger from '@src/config/logger';
import { CustomerEvent } from '@src/interface/CustomerEvents';
import { VehicleInterface } from '@src/interface/VehicleEvents';
import { CustomerRepository } from '@src/repository/CustomerRepository';
import { VehicleRepository } from '@src/repository/VehicleRepository';

export class RabbitMQService {
  async handleCustomerEvent(message: CustomerEvent) {
    const customerRepository = new CustomerRepository();

    logger.info(`[RabbitMQ]: Event Customer ${message.event}`);

    switch (message.event) {
      case 'create':
        await customerRepository.create(message);
        break;
      case 'update':
        await customerRepository.update(message);
        break;
      case 'delete':
        await customerRepository.deactivateById(message.customerId);
        break;
      default:
        break;
    }
  }

  async handleVehicleEvent(message: VehicleInterface) {
    const vehicleRepository = new VehicleRepository();

    logger.info(`[RabbitMQ]: Event Vehicle ${message.event}`);

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
