import { PrismaClient, Vehicle } from '@prisma/client';
import { VehicleInterface } from '@src/interface/VehicleEvents';

export class VehicleRepository {
  private prisma = new PrismaClient();
  private vehicleRepository = this.prisma.vehicle;

  async findAll(): Promise<Vehicle[]> {
    return await this.vehicleRepository.findMany();
  }

  async findAllAvailable(): Promise<Vehicle[]> {
    return await this.vehicleRepository.findMany({
      where: { available: true },
    });
  }

  async findById(vehicleId: string): Promise<Vehicle> {
    return await this.vehicleRepository.findFirst({
      where: { vehicleId },
    });
  }

  async create(data: VehicleInterface): Promise<Vehicle> {
    return await this.vehicleRepository.create({
      data: {
        vehicleId: data.vehicleId,
        name: data.name,
        model: data.model,
        brand: data.brand,
        year: data.year,
        type: data.type,
        kilometers: data.kilometers,
        plate: data.plate,
      },
    });
  }

  async update(data: VehicleInterface): Promise<Vehicle> {
    return await this.vehicleRepository.update({
      where: {
        vehicleId: data.vehicleId,
      },
      data: {
        name: data.name,
        model: data.model,
        brand: data.brand,
        year: data.year,
        type: data.type,
        kilometers: data.kilometers,
        available: data.available,
      },
    });
  }

  async updateStatus(vehicleId: string, status: boolean): Promise<void> {
    await this.vehicleRepository.update({
      where: {
        vehicleId: vehicleId,
      },
      data: {
        available: status,
      },
    });
  }

  async deleteById(vehicleId: string): Promise<void> {
    await this.vehicleRepository.delete({
      where: { vehicleId },
    });
  }
}
