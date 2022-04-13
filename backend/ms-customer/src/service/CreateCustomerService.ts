import bcrypt from 'bcrypt';

import { CustomerRepository } from '@src/repository/CustomerRepository';
import { AddressRepository } from '@src/repository/AddressRepository';
import RequestResponse from '@src/interface/RequestResponse';
import HttpStatusCodes from '@src/util/enum/HttpStatusCodes';
import { formatResponse } from '@src/util/format-response';
import BadRequestError from '@src/util/error/BadRequestError';
import { RequestCreateCustomer } from '@src/interface/Request';
import { RabbitMQProducer } from '@src/util/rabbitmq-producer';

export default class CreateExpenseService {
  private customerRepository = new CustomerRepository();
  private addressRepository = new AddressRepository();
  private rabbitMQProducer = new RabbitMQProducer();

  public async execute(data: RequestCreateCustomer): Promise<RequestResponse> {
    const customerExists = await this.customerRepository.findByDocumentNumber(
      data.documentNumber,
    );
    if (customerExists) {
      throw new BadRequestError(
        'Customer Registraion',
        'Customer already registered',
      );
    }

    data.password = await bcrypt.hash(
      data.password,
      Number(process.env.PASSWORD_SALT),
    );

    const customer = await this.customerRepository.create(data);
    await this.addressRepository.create(customer.customerId, data);
    const result = await this.customerRepository.findById(customer.customerId);

    const message = {
      event: 'create',
      ...customer,
    };
    await this.rabbitMQProducer.sendMessage(
      process.env.RABBITMQ_QUEUE,
      message,
    );

    return formatResponse(HttpStatusCodes.CREATED, 'Success', result);
  }
}
