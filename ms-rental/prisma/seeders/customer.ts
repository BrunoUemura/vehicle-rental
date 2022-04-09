import crypto from 'crypto';

export const customer = [
  {
    customerId: crypto.randomUUID(),
    name: 'john doe',
    email: 'john.doe@gmail.com',
    documentNumber: '55555555555',
    phoneNumber: '99999999999',
    active: true,
  },
  {
    customerId: crypto.randomUUID(),
    name: 'elon musk',
    email: 'elon.musk@gmail.com',
    documentNumber: '66666666666',
    phoneNumber: '99999999999',
    active: true,
  },
  {
    customerId: crypto.randomUUID(),
    name: 'jeff bezos',
    email: 'jeff.bezos@gmail.com',
    documentNumber: '77777777777',
    phoneNumber: '99999999999',
    active: true,
  },
];
