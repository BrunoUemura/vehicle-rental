import { CustomerRepository } from '@src/repository/CustomerRepository';
import { AddressRepository } from '@src/repository/AddressRepository';
import RequestResponse from '@src/interface/RequestResponse';
import HttpStatusCodes from '@src/util/enum/HttpStatusCodes';
import NotFoundError from '@src/util/error/NotFoundError';
import { formatResponse } from '@src/util/format-response';
import { RequestCreateCustomer } from '@src/interface/Request';

export default class UpdateCustomerService {
  private customerRepository = new CustomerRepository();
  private addressRepository = new AddressRepository();

  public async execute(data: RequestCreateCustomer): Promise<RequestResponse> {
    const user = await this.customerRepository.findById(data.customerId);
    if (!user) throw new NotFoundError('Database', 'Customer not registered');

    const userUpdated = await this.customerRepository.update(data);
    if (data.address) await this.addressRepository.update(data);

    return formatResponse(
      HttpStatusCodes.OK,
      'Success',
      `Successfully updated customer ${userUpdated.customerId}`,
    );
  }
}
