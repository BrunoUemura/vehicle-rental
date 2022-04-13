import { RentalOrderRepository } from '@src/repository/RentalOrderRepository';
import RequestResponse from '@src/interface/RequestResponse';
import HttpStatusCodes from '@src/util/enum/HttpStatusCodes';
import NotFoundError from '@src/util/error/NotFoundError';
import { formatResponse } from '@src/util/format-response';
import { FindOrders } from '@src/interface/Request';
import { RentalOrder } from '@prisma/client';
import BadRequestError from '@src/util/error/BadRequestError';

export default class FindOrdersService {
  private rentalOrderRepository = new RentalOrderRepository();

  public async execute({
    customerId,
    orderId,
  }: FindOrders): Promise<RequestResponse> {
    let order: RentalOrder[] = [];

    if (customerId) {
      order = await this.rentalOrderRepository.findByCustomerId(customerId);
    } else if (orderId) {
      order.push(await this.rentalOrderRepository.findById(orderId));
    } else {
      throw new BadRequestError(
        'Order Retrieve',
        'No query parameter provided. Provide orderId or customerId.',
      );
    }

    if (order.length === 0) {
      throw new NotFoundError('Order Retrieve', 'Order not found');
    }

    return formatResponse(HttpStatusCodes.OK, 'Success', order);
  }
}
