import { PrismaClient, Vehicle } from '@prisma/client';
import { VehicleInterface } from '@src/interface/Request';

export class VehicleRepository {
  private prisma = new PrismaClient();
  private vehicleRepository = this.prisma.vehicle;

  async findAll(): Promise<Vehicle[]> {
    return await this.vehicleRepository.findMany();
  }

  async findByPlate(plate: string): Promise<Vehicle> {
    return await this.vehicleRepository.findFirst({
      where: { plate: plate },
    });
  }

  async findById(vehicleId: string): Promise<Vehicle> {
    return await this.vehicleRepository.findFirst({
      where: { vehicleId: vehicleId },
    });
  }

  async create(data: VehicleInterface): Promise<Vehicle> {
    return await this.vehicleRepository.create({
      data: {
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
      },
    });
  }

  async updateStatus(vehicleId: string, status: boolean): Promise<Vehicle> {
    return await this.vehicleRepository.update({
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
      where: {
        vehicleId: vehicleId,
      },
    });
  }
}
