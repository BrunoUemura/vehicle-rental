import { PrismaClient } from '@prisma/client';
import { customer } from './seeders/customer';
import { vehicle } from './seeders/vehicle';

const prisma = new PrismaClient();

async function main() {
  customer.forEach(async customer => {
    await prisma.customer.create({ data: customer });
  });

  vehicle.forEach(async vehicle => {
    await prisma.vehicle.create({ data: vehicle });
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
