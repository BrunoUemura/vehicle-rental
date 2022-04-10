import { PrismaClient, Vehicle } from '@prisma/client';
import { RequestCreateVehicle } from '@src/interface/Request';

export class VehicleRepository {
  private prisma = new PrismaClient();
  private vehicleRepository = this.prisma.vehicle;

  async findByPlate(plate: string): Promise<Vehicle> {
    return await this.vehicleRepository.findFirst({
      where: { plate: plate },
    });
  }

  async findById(vehicleId: string): Promise<Vehicle> {
    return await this.vehicleRepository.findFirst({
      where: { vehicleId: vehicleId, active: true },
      include: { address: {} },
    });
  }

  async create(data: RequestCreateVehicle): Promise<Vehicle> {
    return await this.vehicleRepository.create({
      data: {
        name: data.name.toLowerCase(),
        email: data.email.toLowerCase(),
        password: data.password,
        documentNumber: data.documentNumber,
        phoneNumber: data.phoneNumber,
      },
    });
  }

  async update(data: RequestCreateCustomer): Promise<Vehicle> {
    return await this.vehicleRepository.update({
      where: {
        vehicleId: data.vehicleId,
      },
      data: {
        name: data.name.toLowerCase(),
        phoneNumber: data.phoneNumber,
      },
    });
  }

  async deactivateById(vehicleId: string): Promise<void> {
    await this.vehicleRepository.update({
      where: {
        vehicleId: vehicleId,
      },
      data: {
        active: false,
      },
    });
  }
}
