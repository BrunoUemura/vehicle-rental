import { CustomerRepository } from '@src/repository/CustomerRepository';
import RequestResponse from '@src/interface/RequestResponse';
import HttpStatusCodes from '@src/util/enum/HttpStatusCodes';
import NotFoundError from '@src/util/error/NotFoundError';
import { formatResponse } from '@src/util/format-response';

export default class FindCustomerService {
  private customerRepository = new CustomerRepository();

  public async execute(customerId: string): Promise<RequestResponse> {
    const user = await this.customerRepository.findById(customerId);
    if (!user) throw new NotFoundError('Database', 'Customer not registered');
    return formatResponse(HttpStatusCodes.OK, 'Success', user);
  }
}
