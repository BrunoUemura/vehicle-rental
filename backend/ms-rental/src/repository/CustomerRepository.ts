import { PrismaClient, Customer } from '@prisma/client';
import { CustomerEvent } from '@src/interface/CustomerEvents';

export class CustomerRepository {
  private prisma = new PrismaClient();
  private customerRepository = this.prisma.customer;

  async findByDocumentNumber(documentNumber: string): Promise<Customer> {
    return await this.customerRepository.findFirst({
      where: { documentNumber: documentNumber },
    });
  }

  async findById(customerId: string): Promise<Customer> {
    return await this.customerRepository.findFirst({
      where: { customerId: customerId, active: true },
    });
  }

  async create(data: CustomerEvent): Promise<Customer> {
    return await this.customerRepository.create({
      data: {
        customerId: data.customerId,
        name: data.name.toLowerCase(),
        email: data.email.toLowerCase(),
        documentNumber: data.documentNumber,
        phoneNumber: data.phoneNumber,
      },
    });
  }

  async update(data: CustomerEvent): Promise<Customer> {
    return await this.customerRepository.update({
      where: {
        customerId: data.customerId,
      },
      data: {
        name: data.name.toLowerCase(),
        phoneNumber: data.phoneNumber,
      },
    });
  }

  async deactivateById(customerId: string): Promise<void> {
    await this.customerRepository.update({
      where: {
        customerId: customerId,
      },
      data: {
        active: false,
      },
    });
  }
}
