import { CustomerRepository } from '@src/repository/CustomerRepository';
import { VehicleRepository } from '@src/repository/VehicleRepository';
import { RentalOrderRepository } from '@src/repository/RentalOrderRepository';
import RequestResponse from '@src/interface/RequestResponse';
import HttpStatusCodes from '@src/util/enum/HttpStatusCodes';
import { formatResponse } from '@src/util/format-response';
import BadRequestError from '@src/util/error/BadRequestError';
import { CreateOrder } from '@src/interface/Request';
import { calculateEstimatedKM, calculateAmount } from '@src/util/funcitons';
import { RabbitMQProducer } from '@src/util/rabbitmq-producer';

export default class CreateOrderService {
  private customerRepository = new CustomerRepository();
  private vehicleRepository = new VehicleRepository();
  private rentalOrderRepository = new RentalOrderRepository();
  private rabbitMQProducer = new RabbitMQProducer();

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
    data.estimatedAmount = calculateAmount(data.estimatedKM);
    data.totalAmount = data.estimatedAmount;

    await this.vehicleRepository.updateStatus(data.vehicleId, false);
    const result = await this.rentalOrderRepository.create(data);

    return formatResponse(HttpStatusCodes.CREATED, 'Success', result);
  }
}
