import { Customer } from '@prisma/client';

export default interface RequestResponse {
  status: number;
  body: Customer[];
}
