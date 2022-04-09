import { CustomerRepository } from '@src/repository/CustomerRepository';
import { AddressRepository } from '@src/repository/AddressRepository';
import RequestResponse from '@src/interface/RequestResponse';
import HttpStatusCodes from '@src/util/enum/HttpStatusCodes';
import NotFoundError from '@src/util/error/NotFoundError';
import { formatResponse } from '@src/util/format-response';
import { RequestCreateCustomer } from '@src/interface/Request';
import { RabbitMQProducer } from '@src/util/rabbitmq-producer';

export default class UpdateCustomerService {
  private customerRepository = new CustomerRepository();
  private addressRepository = new AddressRepository();
  private rabbitMQProducer = new RabbitMQProducer();

  public async execute(data: RequestCreateCustomer): Promise<RequestResponse> {
    const customer = await this.customerRepository.findById(data.customerId);
    if (!customer)
      throw new NotFoundError(
        `${process.env.KAFKA_TOPIC}.update`,
        'Customer not registered',
      );

    const customerUpdated = await this.customerRepository.update(data);
    if (data.address) await this.addressRepository.update(data);

    const message = {
      event: 'update',
      ...customerUpdated,
    };
    await this.rabbitMQProducer.sendMessage(
      process.env.RABBITMQ_QUEUE,
      message,
    );

    return formatResponse(
      HttpStatusCodes.OK,
      'Success',
      `Successfully updated customer ${customerUpdated.customerId}`,
    );
  }
}
