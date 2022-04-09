import { CustomerRepository } from '@src/repository/CustomerRepository';
import RequestResponse from '@src/interface/RequestResponse';
import HttpStatusCodes from '@src/util/enum/HttpStatusCodes';
import NotFoundError from '@src/util/error/NotFoundError';
import { formatResponse } from '@src/util/format-response';
import { RabbitMQProducer } from '@src/util/rabbitmq-producer';

export default class DeleteCustomerService {
  private customerRepository = new CustomerRepository();
  private rabbitMQProducer = new RabbitMQProducer();

  public async execute(customerId: string): Promise<RequestResponse> {
    const customer = await this.customerRepository.findById(customerId);

    if (!customer)
      throw new NotFoundError('Customer Delete', 'Customer not registered');

    await this.customerRepository.deactivateById(customerId);

    const message = {
      event: 'delete',
      ...customer,
    };

    await this.rabbitMQProducer.sendMessage(
      process.env.RABBITMQ_QUEUE,
      message,
    );

    return formatResponse(HttpStatusCodes.NO_CONTENT, 'Success', null);
  }
}
