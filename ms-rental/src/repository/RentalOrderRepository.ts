import { PrismaClient, RentalOrder } from '@prisma/client';
import { CreateOrder, UpdateOrder } from '@src/interface/Request';

export class RentalOrderRepository {
  private prisma = new PrismaClient();
  private rentalOrderRepository = this.prisma.rentalOrder;

  async findById(orderId: string) {
    return await this.rentalOrderRepository.findFirst({
      where: { orderId: orderId },
      include: { customer: true, vehicle: true },
    });
  }

  async findByCustomerId(customerId: string): Promise<RentalOrder[]> {
    return await this.rentalOrderRepository.findMany({
      where: { customerId: customerId },
      include: { customer: true, vehicle: true },
    });
  }

  async create(data: CreateOrder): Promise<RentalOrder> {
    return await this.rentalOrderRepository.create({
      data: {
        customerId: data.customerId,
        vehicleId: data.vehicleId,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        estimatedKM: data.estimatedKM,
        estimatedAmount: data.estimatedAmount,
        additionalAmount: data.additionalAmount,
        totalAmount: data.totalAmount,
      },
    });
  }

  async update(data: UpdateOrder): Promise<RentalOrder> {
    return await this.rentalOrderRepository.update({
      where: {
        orderId: data.orderId,
      },
      data: {
        customerId: data.customerId,
        vehicleId: data.vehicleId,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        estimatedKM: data.estimatedKM,
        estimatedAmount: data.estimatedAmount,
        additionalAmount: data.additionalAmount,
        totalAmount: data.totalAmount,
      },
    });
  }

  async updateReturn(data: UpdateOrder): Promise<RentalOrder> {
    return await this.rentalOrderRepository.update({
      where: {
        orderId: data.orderId,
      },
      data: {
        drivenKM: data.drivenKM,
        returnedDate: new Date(data.returnedDate),
      },
    });
  }

  async deleteById(orderId: string): Promise<void> {
    await this.rentalOrderRepository.update({
      where: {
        orderId: orderId,
      },
      data: {
        canceledAt: new Date(),
      },
    });
  }
}
