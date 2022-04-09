import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { CustomerRepository } from '@src/repository/CustomerRepository';
import { AddressRepository } from '@src/repository/AddressRepository';
import RequestResponse from '@src/interface/RequestResponse';
import HttpStatusCodes from '@src/util/enum/HttpStatusCodes';
import { formatResponse } from '@src/util/format-response';
import BadRequestError from '@src/util/error/BadRequestError';
import { RequestCreateCustomer } from '@src/interface/Request';
import { RabbitMQProducer } from '@src/util/rabbitmq-producer';
import UnauthorizedError from '@src/util/error/UnauthorizedError';

export default class SignInCustomerService {
  private customerRepository = new CustomerRepository();

  public async execute(data: RequestCreateCustomer): Promise<RequestResponse> {
    const customer = await this.customerRepository.findByDocumentNumber(
      data.documentNumber,
    );
    if (!customer) {
      throw new BadRequestError('Sign In Customer', 'Customer not registered');
    }

    const match = await bcrypt.compare(data.password, customer.password);
    if (!match) {
      throw new UnauthorizedError('Authentication failed. Check credentials');
    }

    const payload = { id: customer.customerId };
    const expiration = { expiresIn: '1h' };
    const token = jwt.sign(payload, String(process.env.JWT_SECRET), expiration);
    const result = {
      token,
      customer,
    };

    return formatResponse(HttpStatusCodes.CREATED, 'Success', result);
  }
}
