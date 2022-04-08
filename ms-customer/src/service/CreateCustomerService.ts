import { CustomerRepository } from '@src/repository/CustomerRepository';
import { AddressRepository } from '@src/repository/AddressRepository';
import RequestResponse from '@src/interface/RequestResponse';
import HttpStatusCodes from '@src/util/enum/HttpStatusCodes';
import { formatResponse } from '@src/util/format-response';
import BadRequestError from '@src/util/error/BadRequestError';
import { RequestCreateCustomer } from '@src/interface/Request';

export default class CreateExpenseService {
  private customerRepository = new CustomerRepository();
  private addressRepository = new AddressRepository();

  public async execute(data: RequestCreateCustomer): Promise<RequestResponse> {
    const user = await this.customerRepository.findByDocumentNumber(
      data.documentNumber,
    );
    if (user) {
      throw new BadRequestError('Database', 'Customer already registered');
    }

    const customer = await this.customerRepository.create(data);
    await this.addressRepository.create(customer.customerId, data);
    const result = await this.customerRepository.findById(customer.customerId);

    return formatResponse(HttpStatusCodes.CREATED, 'Success', result);
  }
}
