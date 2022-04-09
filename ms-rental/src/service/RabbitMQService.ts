import logger from '@src/config/logger';
import { CustomerEvent } from '@src/interface/CustomerEvents';
import { CustomerRepository } from '@src/repository/CustomerRepository';

export class RabbitMQService {
  async handleEvent(message: CustomerEvent) {
    const customerRepository = new CustomerRepository();

    const events = {
      create: await customerRepository.create(message),
      update: await customerRepository.update(message),
      delete: await customerRepository.deactivateById(message.customerId),
    };

    logger.info(`[RabbitMQ]: Event ${message.event}`);

    events[message.event];
  }
}
