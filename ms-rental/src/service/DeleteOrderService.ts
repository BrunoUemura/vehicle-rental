import { VehicleRepository } from '@src/repository/VehicleRepository';
import { RentalOrderRepository } from '@src/repository/RentalOrderRepository';
import RequestResponse from '@src/interface/RequestResponse';
import HttpStatusCodes from '@src/util/enum/HttpStatusCodes';
import NotFoundError from '@src/util/error/NotFoundError';
import { formatResponse } from '@src/util/format-response';
import BadRequestError from '@src/util/error/BadRequestError';

export default class DeleteOrderService {
  private vehicleRepository = new VehicleRepository();
  private rentalOrderRepository = new RentalOrderRepository();

  public async execute(orderId: string): Promise<RequestResponse> {
    const order = await this.rentalOrderRepository.findById(orderId);
    if (!order) throw new NotFoundError('Order Cancelation', 'Order not found');
    if (order.returnedDate !== null) {
      throw new BadRequestError('Order Cancelation', 'Order already returned');
    }

    await this.rentalOrderRepository.deleteById(orderId);
    await this.vehicleRepository.updateStatus(order.vehicleId, true);

    return formatResponse(HttpStatusCodes.NO_CONTENT, 'Success', null);
  }
}
