import { RentalOrderRepository } from '@src/repository/RentalOrderRepository';
import { VehicleRepository } from '@src/repository/VehicleRepository';
import RequestResponse from '@src/interface/RequestResponse';
import HttpStatusCodes from '@src/util/enum/HttpStatusCodes';
import NotFoundError from '@src/util/error/NotFoundError';
import { formatResponse } from '@src/util/format-response';
import { UpdateOrder } from '@src/interface/Request';
import { RentalOrder } from '@prisma/client';
import calculateEstimatedKM from '@src/util/calculate-estimated-km';

export default class UpdateOrderService {
  private rentalOrderRepository = new RentalOrderRepository();
  private vehicleRepository = new VehicleRepository();

  public async execute(data: UpdateOrder): Promise<RequestResponse> {
    const order = await this.rentalOrderRepository.findById(data.orderId);
    if (!order) throw new NotFoundError('Order Update', 'Order not found');

    let orderUpdated: RentalOrder;

    if (data.drivenKM && data.returnedDate) {
      orderUpdated = await this.rentalOrderRepository.updateReturn(data);

      order.vehicle.kilometers += data.drivenKM;
      await this.vehicleRepository.update(order.vehicle);
      await this.vehicleRepository.updateStatus(data.vehicleId, true);
    } else {
      data.estimatedKM = calculateEstimatedKM(data.startDate, data.endDate);
      orderUpdated = await this.rentalOrderRepository.update(data);
    }

    return formatResponse(HttpStatusCodes.OK, 'Success', orderUpdated);
  }
}
