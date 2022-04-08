import { PrismaClient, Customer, Address } from '@prisma/client';
import { RequestCreateCustomer } from '@src/interface/Request';

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
      where: { customerId: customerId },
      include: { address: {} },
    });
  }

  async create(data: RequestCreateCustomer): Promise<Customer> {
    return await this.customerRepository.create({
      data: {
        name: data.name.toLowerCase(),
        email: data.email.toLowerCase(),
        password: data.password,
        documentNumber: data.documentNumber,
        phoneNumber: data.phoneNumber,
      },
    });
  }

  async update(data: RequestCreateCustomer): Promise<Customer> {
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

  async deleteById(customerId: string): Promise<void> {
    await this.customerRepository.delete({
      where: {
        customerId: customerId,
      },
    });
  }
}
