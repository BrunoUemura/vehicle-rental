import crypto from 'crypto';

export const vehicle = [
  {
    vehicleId: crypto.randomUUID(),
    name: 'civic',
    model: 'EX CVT',
    brand: 'HONDA',
    year: 2019,
    type: 'CAR',
    kilometers: 45000,
    plate: 'GWR-2287',
  },
  {
    vehicleId: crypto.randomUUID(),
    name: 'Onix',
    model: 'XFA',
    brand: 'CHEVROLET',
    year: 2021,
    type: 'CAR',
    kilometers: 5000,
    plate: 'QWERT2287',
  },
];
