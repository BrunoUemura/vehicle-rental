import { PrismaClient, Address } from '@prisma/client';
import { RequestCreateCustomer } from '@src/interface/Request';

export class AddressRepository {
  private prisma = new PrismaClient();
  private addressRepository = this.prisma.address;

  async create(
    customerId: string,
    { address }: RequestCreateCustomer,
  ): Promise<Address> {
    return await this.addressRepository.create({
      data: {
        customerId: customerId,
        street: address.street.toLowerCase(),
        number: Number(address.number),
        district: address.district.toLowerCase(),
        city: address.city.toLowerCase(),
        state: address.state.toLowerCase(),
        country: address.country.toLowerCase(),
        zipCode: address.zipCode,
      },
    });
  }

  async update({
    customerId,
    address,
  }: RequestCreateCustomer): Promise<Address> {
    return await this.addressRepository.update({
      where: {
        customerId: customerId,
      },
      data: {
        street: address.street.toLowerCase(),
        number: Number(address.number),
        district: address.district.toLowerCase(),
        city: address.city.toLowerCase(),
        state: address.state.toLowerCase(),
        country: address.country.toLowerCase(),
        zipCode: address.zipCode,
      },
    });
  }
}
