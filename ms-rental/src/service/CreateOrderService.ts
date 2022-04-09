import moment from 'moment';
import { CustomerRepository } from '@src/repository/CustomerRepository';
import { VehicleRepository } from '@src/repository/VehicleRepository';
import { RentalOrderRepository } from '@src/repository/RentalOrderRepository';
import RequestResponse from '@src/interface/RequestResponse';
import HttpStatusCodes from '@src/util/enum/HttpStatusCodes';
import { formatResponse } from '@src/util/format-response';
import BadRequestError from '@src/util/error/BadRequestError';
import { CreateOrder } from '@src/interface/Request';
import calculateEstimatedKM from '@src/util/calculate-estimated-km';

export default class CreateOrderService {
  private customerRepository = new CustomerRepository();
  private vehicleRepository = new VehicleRepository();
  private rentalOrderRepository = new RentalOrderRepository();

  public async execute(data: CreateOrder): Promise<RequestResponse> {
    const user = await this.customerRepository.findById(data.customerId);
    if (!user) {
      throw new BadRequestError('Order Creation', 'Customer not registered');
    }

    const vehicle = await this.vehicleRepository.findById(data.vehicleId);
    if (!vehicle.available) {
      throw new BadRequestError('Order Creation', 'Vehicle not available');
    }

    data.estimatedKM = calculateEstimatedKM(data.startDate, data.endDate);

    await this.vehicleRepository.updateStatus(data.vehicleId, false);
    const result = await this.rentalOrderRepository.create(data);

    return formatResponse(HttpStatusCodes.CREATED, 'Success', result);
  }
}
